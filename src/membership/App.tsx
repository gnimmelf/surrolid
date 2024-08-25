import { Accessor, Component, createEffect, createRenderEffect, createSignal, from, onError, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import resetStyles from '@unocss/reset/normalize.css?inline';
import customStyles from './app.css?inline';

import { I18nProvider } from '../components/I18nProvider';
import {
  ServiceProvider,
  useService,
} from '../components/ServiceProvider';

import { Login } from '../components/Login';
import { TopBar } from '../components/TopBar';
import { TBD } from '../components/TBD';

import { Profile } from './Profile';
import { Account } from './Account';
import { AuthenticationError } from '../lib/errors';

const App: Component<{
  title: string;
}> = (props) => {
  const [t] = useI18n();
  const { auth } = useService();
  const [slTabGroupEl, setSlTabGroupEl] = createSignal<HTMLElement>();

  const authState: Accessor<{ isAuthenticated: boolean } | undefined> = from(auth)
  const isAuthenticated = () => authState()?.isAuthenticated

  createEffect(() => {
    const { activePanel } = localStorage;
    const el: any = slTabGroupEl();
    if (activePanel && el) {
      el.updateComplete.then(() => {
        el.show(activePanel);
      });
    }
  });

  onError((error) => {
    if (error instanceof AuthenticationError) {
      console.warn('Session expired, signing out');
      auth.signout();
    } else {
      throw error;
    }
  });

  return (
    <main class="app">
      <style data-name="reset">{resetStyles}</style>
      <style data-name="unocss">@unocss-placeholder</style>
      <style data-name="custom">{customStyles}</style>
      <div>
        <TopBar title={props.title} />

        <Show when={!isAuthenticated()}>
          <Login title="Login" />
        </Show>
        <Show when={isAuthenticated()}>
          <sl-tab-group
            on:sl-tab-show={({ detail }: any) => {
              localStorage.activePanel = detail.name;
            }}
            ref={(el: HTMLElement) => setSlTabGroupEl(el)}
          >
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

            <sl-tab-panel attr:name="account">
              <Account />
              <Profile />
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
    </main>
  );
};

const AppProvider: Component<{
  datapoint: string;
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  onError((error) => console.error(`App::onError: ${error}`));

  return (
    <I18nProvider>
      <ServiceProvider
        namespace={props.namespace}
        database={props.database}
        scope={props.scope}
        datapoint={props.datapoint}
      >
        <App title={props.title} />
      </ServiceProvider>
    </I18nProvider>
  );
};

export default AppProvider;
