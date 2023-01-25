import { Component, Show, Suspense } from 'solid-js';
import {
  I18nContext,
  createI18nContext,
  useI18n,
} from '@solid-primitives/i18n';

import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import '@shoelace-style/shoelace/dist/components/tab/tab';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';
import '@shoelace-style/shoelace/dist/components/icon/icon';

import resetStyles from '@unocss/reset/normalize.css';
import themeStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';

import noTexts from '../locale/no-nb.json';
import customStyles from './app.css?inline';

import { ServiceProvider, useService } from './service';

import { Login } from './Login';
import { Loading } from './Loading';
import { Profile } from './Profile';
import { TopBar } from './TopBar';

registerIconLibrary('default', {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${name}.svg`,
});

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
      <style data-name="reset">{resetStyles}</style>
      <style data-name="theme">{themeStyles}</style>
      <style data-name="unocss">@unocss-placeholder</style>
      <style data-name="custom">{customStyles}</style>
      <div>
        <Suspense fallback={<Loading />}>
          <TopBar title={props.title} />
          <Show when={!state.authenticated}>
            <Login title="Login" />
          </Show>
          <Show when={state.authenticated}>
            <sl-tab-group>
              <sl-tab slot="nav" attr:panel="profile">
                <sl-icon attr:name="person" />
                {t('Profile')}
              </sl-tab>
              <sl-tab slot="nav" attr:panel="account">
                <sl-icon attr:name="person-lock" />
                {t('Account')}
              </sl-tab>
              <sl-tab slot="nav" attr:panel="subscription">
                <sl-icon attr:name="journal" />
                {t('Subscription')}
              </sl-tab>
              <sl-tab slot="nav" attr:panel="contact">
                <sl-icon attr:name="person-hearts" />
                {t('Contact')}
              </sl-tab>

              <sl-tab-panel attr:name="profile">
                <Profile />
              </sl-tab-panel>
              <sl-tab-panel attr:name="account">
                <TBD title={t('Account')} />
              </sl-tab-panel>
              <sl-tab-panel attr:name="subscription">
                <TBD title={t('Subscription')} />
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
      <div class="absolute bottom-5 right-0 left-0 text-center op30 fw300">
        UnoCss - Styled center & absolute bottom
      </div>
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
