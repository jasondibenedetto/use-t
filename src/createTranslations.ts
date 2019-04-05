import * as React from 'react';
import {ProviderProps, ProviderState, TransProps, Result, UseT, TranslatorFn, WithT} from './types';
import invariant from 'tiny-invariant';

const defaultInterpolate = (strs: TemplateStringsArray, args: any[]) => {
  let str = '', i = 0;
  for (; i < args.length; i++) str += strs![i] + args[i];
  return str + strs![i];
};

export const createTranslations = (ns: string = 'main'): Result => {
  const context = React.createContext<ProviderState>({} as any);
  const {Consumer} = context;
  const Provider = class extends React.Component<ProviderProps, ProviderState> {
    static defaultProps = {
      locale: 'en',
      defaultLocale: 'en',
      ns,
    };

    state: ProviderState;

    constructor (props) {
      super(props);
      const {map = {}, locale, defaultLocale, ns} = props;

      // Normalize translation map.
      if (!map[defaultLocale]) map[defaultLocale] = {[ns]: {}};
      else if (!map[defaultLocale][ns]) map[defaultLocale][ns] = {};

      this.state = {
        locale,
        ns,
        map,
        load: this.load,
        setLocale: this.setLocale,
        createT: this.createT,
      };

      if (locale !== defaultLocale) {
        this.load(locale, ns);
      }
    }

    load = async (locale: string, ns: string) => {
      if (!this.state.map[locale]) {
        this.state.map[locale] = {};
      }
      if (!this.state.map[locale][ns]) {
        this.state.map[locale][ns] = {};
        this.setState({...this.state});
        invariant(!!this.props.loader, 'use-t provider .loader() prop not set.');
        const translations = await this.props.loader!(locale, ns);
        this.state.map[locale][ns] = translations;
        this.setState({...this.state});
      }
    };

    setLocale = (locale: string) => {
      if (locale === this.state.locale) return;
      if (!this.state.map[locale])
        this.state.map[locale] = {};
      this.setState({
        locale,
      });
    };

    createT = (nss: string[] = [this.props.ns as string]): TranslatorFn => {
      const {locale} = this.state;
      const translationsNamespaced = this.state.map[locale];
      for (const ns of nss) {
        if (!translationsNamespaced[ns]) {
          this.load(locale, ns).catch(err => console.error(err));
        }
      }

      const t: TranslatorFn = ((key: string, ...args: any[]) => {
        for (const currentLocale of [locale, this.props.defaultLocale]) {
          if (!currentLocale) break;
          const translationsNamespaced = this.state.map[currentLocale];
          for (const namespace of nss) {
            const translations = translationsNamespaced[namespace];
            const value = translations[key];
            if (value !== undefined) {
              return typeof value === 'function'
                ? value(...args) : value || key;
            }
          }
        }

        return key;
      }) as TranslatorFn;
      t.t = key => (strs?: TemplateStringsArray, ...args: any[]) => {
        const result = t(key, ...args);
        if (result !== key) return result;
        else return defaultInterpolate(strs!, args);
      };

      return t;
    };

    render () {
      return React.createElement(context.Provider, {
        value: this.state,
        children: this.props.children,
      });
    }
  };

  const defaultT: TranslatorFn = (k => k) as TranslatorFn;
  defaultT.t = key => (strs, ...args) => defaultInterpolate(strs!, args);

  const useT: UseT = (namespaces?: string | string[]) => {
    const nss: string[] = namespaces instanceof Array ? namespaces : [namespaces || ns];
    const state = (React as any).useContext(context) as ProviderState;
    return [state.createT ? state.createT(nss) : defaultT, state];
  };

  const withT: WithT = <T extends React.ComponentType>(Comp: T, nss: string | string[] = ns) => {
    if (!Array.isArray(nss)) nss = [nss];
    return (props => {
      const [t, T] = useT(nss as string[]);
      return React.createElement(Comp, {...(props as any), t, T});
    }) as T;
  };

  const Trans: React.FC<TransProps> = (props) => {
    const {children} = props;
    const nss: string[] = props.ns instanceof Array ? props.ns : [props.ns || ns];
    const [t, T] = useT(nss);

    return (typeof children === 'function'
      ? children(t, T)
      : children instanceof Array
        ? React.createElement(React.Fragment, null, ...children.map(item =>
          typeof item === 'function'
            ? (item as any)(t)
            : typeof item === 'string'
              ? t(item)
              : item || null
        ))
        : typeof children === 'string'
          ? t(children)
          : children) || null;
  };

  return {
    Consumer,
    Provider,
    context,
    useT,
    Trans,
    withT,
    T: defaultT,
  };
};

export default createTranslations;
