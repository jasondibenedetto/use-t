import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {createTranslations} from '..';

const {Provider, useT, withT} = createTranslations();

const Demo = () => {
  const [t, {setLocale}] = useT();
  return (
    <div>
      {t('Hello')}, user! {t('welcome')}
      <br />
      <button onClick={() => setLocale('en')}>en</button>
      <button onClick={() => setLocale('fr')}>fr</button>
    </div>
  );
};

storiesOf('useT', module)
  .add('Switch preloaded translations', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
      fr: {
        main: {Hello: 'Bonjour', welcome: 'Lala!'}
      },
    }}>
      <Demo/>
    </Provider>
  )
  .add('Missing language', () =>
    <Provider map={{
      en: {
        main: {Hello: 'Hello', welcome: 'Welcome!'}
      },
    }}>
      <Demo/>
    </Provider>
  )
  .add('Load translations dynamically', () =>
    <Provider
      map={{
        en: {
          main: {Hello: 'Hello', welcome: 'Welcome!'}
        },
      }}
      loader={() => Promise.resolve({Hello: 'Bonjour', welcome: 'Lala!'})}
    >
      <Demo/>
    </Provider>
  )
  .add('Without provider', () =>
    <Demo/>
  )
