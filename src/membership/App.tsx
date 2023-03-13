import {
  Component,
  createEffect,
  createSignal,
  onError,
  Show,
  Suspense,
} from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import '@shoelace-style/shoelace/dist/components/tab/tab';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';
import '@shoelace-style/shoelace/dist/components/icon/icon';

import resetStyles from '@unocss/reset/normalize.css?inline';
import themeStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';

import customStyles from './app.css?inline';

import { I18nProvider } from '../components/I18nProvider';
import {
  ServiceProvider,
  TService,
  useService,
} from '../services/ServiceProvider';

import { Login } from '../components/Login';
import { TopBar } from './TopBar';
import { Profile } from './Profile';
import { Account } from './Account';
import { Loading } from '../components/Loading';

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
  const { auth } = useService() as TService;
  const [slTabGroupEl, setSlTabGroupEl] = createSignal<HTMLElement>();

  createEffect(() => {
    const { activePanel } = localStorage;
    const el: any = slTabGroupEl();
    if (activePanel && el) {
      el.updateComplete.then(() => {
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

        <Show when={!auth.authenticated()}>
          <Login title="Login" />
        </Show>
        <Show when={auth.authenticated()}>
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

const AppWrapper: Component<{
  apibaseurl: string;
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  onError((error) => console.error(`onError: ${error}`));

  return (
    <I18nProvider>
      <ServiceProvider
        namespace={props.namespace}
        database={props.database}
        scope={props.scope}
        apibaseurl={props.apibaseurl}
      >
        <App title={props.title} />
      </ServiceProvider>
    </I18nProvider>
  );
};

export default AppWrapper;
