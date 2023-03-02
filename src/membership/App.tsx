import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import '@shoelace-style/shoelace/dist/components/tab/tab';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';
import '@shoelace-style/shoelace/dist/components/icon/icon';

import resetStyles from '@unocss/reset/normalize.css?inline';
import themeStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';

import customStyles from './app.css?inline';

import { I18nProvider } from '../locale/I18nProvider';
import { ServiceProvider, useService } from '../lib/service';

import { Login } from './Login';
import { Loading } from '../components/Loading';
import { TopBar } from './TopBar';
import { Profile } from './Profile';
import { Account } from './Account';

registerIconLibrary('default', {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/icons/${name}.svg`,
});

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
  const [slTabGroupEl, setSlTabGroupEl] = createSignal<HTMLElement>();

  createEffect(() => {
    const { activePanel } = localStorage;
    const el: any = slTabGroupEl();
    if (activePanel && el) {
      el.updateComplete.then(() => {
        console.log(el, el.panels.length);
        el.show(activePanel);
      });
    }
  });

  return (
    <main class="app">
      <style data-name="reset">{resetStyles}</style>
      <style data-name="theme">{themeStyles}</style>
      <style data-name="unocss">@unocss-placeholder</style>
      <style data-name="custom">{customStyles}</style>
      <div>
        <TopBar title={props.title} />
        <Show when={!state.authenticated}>
          <Login title="Login" />
        </Show>
        <Show when={state.authenticated}>
          <sl-tab-group
            on:sl-tab-show={({ detail }: any) => {
              localStorage.activePanel = detail.name;
            }}
            ref={(el: HTMLElement) => setSlTabGroupEl(el)}
          >
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
              <Account />
            </sl-tab-panel>
            <sl-tab-panel attr:name="subscription">
              <TBD title={t('Subscription')} />
            </sl-tab-panel>
            <sl-tab-panel attr:name="contact">
              <TBD title={t('Contact')} />
            </sl-tab-panel>
          </sl-tab-group>
        </Show>
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

  return (
    <I18nProvider>
      <ServiceProvider
        namespace={props.namespace}
        database={props.database}
        scope={props.scope}
      >
        <App title={props.title} />
      </ServiceProvider>
    </I18nProvider>
  );
};

export default AppWrapper;
