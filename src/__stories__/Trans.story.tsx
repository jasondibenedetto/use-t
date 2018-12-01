import * as React from 'react';
import {storiesOf} from '@storybook/react';
import createTranslations from '../createTranslations';

const {Provider, Trans} = createTranslations();

const Demo: React.SFC<{t: any, T: any}> = ({t, T}) => {
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
      <br />
      <button onClick={() => T.setLocale('en')}>en</button>
      <button onClick={() => T.setLocale('fr')}>fr</button>
    </div>
  );
};

storiesOf('Trans', module)
  .add('Switch preloaded translations as FaCC', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Trans>{({t, T}) =>
        <Demo t={t} T={T} />
      }</Trans>
    </Provider>
  )
  .add('Switch preloaded translations as render prop', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Trans render={({t, T}) =>
        <Demo t={t} T={T} />
      } />
    </Provider>
  )
  .add('Missing language', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
    }}>
      <Trans>{({t, T}) =>
        <Demo t={t} T={T} />
      }</Trans>
    </Provider>
  )
  .add('Load translations dynamically, 2 sec delay', () =>
    <Provider
      map={{
        en: {
          main: {Hello: 'Hello', welcome: 'Welcome!'}
        },
      }}
      loader={() => new Promise(resolve => {
        setTimeout(() => {
          resolve({Hello: 'Bonjour', welcome: 'Lala!'});
        }, 2000);
      })}
    >
      <Trans>{({t, T}) =>
        <Demo t={t} T={T} />
      }</Trans>
    </Provider>
  )
  .add('Without provider', () =>
    <Trans>{({t, T}) =>
      <Demo t={t} T={T} />
    }</Trans>
  )
