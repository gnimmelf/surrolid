import { Component, Show, Suspense, onError } from 'solid-js';
import {
  I18nContext,
  createI18nContext,
  useI18n,
} from '@solid-primitives/i18n';

import noTexts from '../locale/no-nb.json';

import { getBrowserLocales } from '../lib/utils';

import theme from '@shoelace-style/shoelace/dist/themes/light.css?inline';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import '@shoelace-style/shoelace/dist/components/tab/tab';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';

import { ServiceProvider, useService } from './service';

import { Login } from './Login';
import { Logout } from './Logout';
import { Profile } from './Profile';

import { Locale } from './Locale';
import { Loading } from './Loading';

import styles from './app.css?inline';

setBasePath('@shoelace-style/shoelace/dist');

const LOCALES = Object.freeze([
  {
    code: 'no',
    name: 'norsk',
    dict: noTexts,
  },
  {
    code: 'en',
    name: 'english',
    dict: Object.keys(noTexts).reduce(
      (acc, key) => ({ ...acc, [key]: key }),
      []
    ),
  },
]);

const TBD = (props: { title: string }) => {
  return (
    <section>
      <h2>{props.title}</h2>
      <p>Not implemented!</p>
    </section>
  );
};

const App: Component<{
  title: string;
}> = (props) => {
  const [t] = useI18n();
  const { state } = useService();

  return (
    <main class="app">
      <style>
        {theme}
        @unocss-placeholder
        {styles}
      </style>
      <div class="sl-theme-dark">
        <h1>{props.title}</h1>
        <Suspense fallback={<Loading />}>
          <Locale />
          <Show when={!state.authenticated}>
            <Login title="Login" />
          </Show>
          <Show when={state.authenticated}>
            <Logout />

            <sl-tab-group>
              <sl-tab slot="nav" attr:panel="profile">
                {t('Profile')}
              </sl-tab>
              <sl-tab slot="nav" attr:panel="account">
                {t('Account')}
              </sl-tab>
              <sl-tab slot="nav" attr:panel="contact">
                {t('Contact')}
              </sl-tab>

              <sl-tab-panel attr:name="profile">
                <Profile />
              </sl-tab-panel>
              <sl-tab-panel attr:name="account">
                <TBD title={t('Account')} />
              </sl-tab-panel>
              <sl-tab-panel attr:name="contact">
                <TBD title={t('Contact')} />
              </sl-tab-panel>
            </sl-tab-group>
          </Show>
        </Suspense>
      </div>
      <Show when={localStorage.debug}>
        <hr />
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Show>
    </main>
  );
};

const AppWrapper: Component<{
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  // onError((error) => console.warn(`onError: ${error}`));

  const i18nDict = LOCALES.reduce(
    (acc, { code, dict }) => ({ ...acc, [code]: dict }),
    {}
  );

  const i18nLangs = LOCALES.map(({ code, name }) => ({ code, name }));

  console.log({ i18nDict, i18nLangs });

  return (
    <I18nContext.Provider value={createI18nContext(i18nDict)}>
      <ServiceProvider
        namespace={props.namespace}
        database={props.database}
        scope={props.scope}
        langs={i18nLangs}
      >
        <App title={props.title} />
      </ServiceProvider>
    </I18nContext.Provider>
  );
};

export default AppWrapper;
