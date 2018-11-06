import {UniversalProps} from 'react-universal-interface';

// Translation function `t`.
export type TranslatorFn = (key: string, ...args: any[]) => string;

// Props of React components with translation function.
export interface PropsWithT {
  t: TranslatorFn;
}

// Default translation function.
export const T: TranslatorFn = (key: string) => key;

// Collection of translations.
export interface Translations {
  [key: string]: string | ((T: TranslatorFn, ...args: any[]) => any);
}

// Collecion of translations by namespace.
export interface TranslationsNamespaced {
  [namespace: string]: Translations;
}

// Collection of namespaced translations by locale.
export interface TranslationMap {
  [locale: string]: TranslationsNamespaced;
}

export interface ProviderProps {
  locale?: string; // Default locale.
  ns?: string; // Default namespace.
  loader?: (locale: string, namespace: string) => Promise<Translations>;
  map?: TranslationMap; // Preloaded translations.
}

export interface ProviderState {
  locale: string; // Active locale.
  ns: string; // Active namespace.
  map: TranslationMap;
  load: (locale: string, namespace: string) => Promise<void>;
  setLocale: (locale: string) => void;
}

export interface TranslateProps extends UniversalProps<TranslatorFn> {
  ns?: string | string[];
}

export type UseT = (namespaces?: string[]) => [TranslatorFn, ProviderState];

export interface Result {
  Provider: React.ComponentClass<ProviderProps, ProviderState>;
  Consumer: any;
  context: React.Context<ProviderState>;
  useT: UseT;
  withT: (Comp) => React.SFC<any>;
  Translate: any;
}
