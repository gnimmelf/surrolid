import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  from,
  catchError,
  Show,
  ErrorBoundary
} from 'solid-js';

import customStyles from './app.css?inline';

import { I18nProvider, useI18n } from '../components/I18nProvider';
import {
  ServiceProvider,
  useService,
} from './ServiceProvider';

import { Login } from './Login';
import { TopBar } from './TopBar';
import { TBD } from '../components/TBD';

import { Profile } from './Profile';
import { Account } from './Account';
import { AuthenticationError } from '../lib/errors';
import { ErrorFallback } from '../components/ErrorFallback';
import { logError } from '../lib/utils';

const App: Component<{
  title: string;
}> = (props) => {
  const { t } = useI18n();
  const { auth } = useService();
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

  catchError(() => {}, (error) => {
    if (error instanceof AuthenticationError) {
      logError(error);
      auth.signout();
    } else {

      throw error;
    }
  });

  return (
    <main class="app">
      <style data-name="custom">{customStyles}</style>
      <div>
        <TopBar title={props.title} />

        <Show when={!auth.state().isAuthenticated}>
          <Login title="Login" />
        </Show>
        <Show when={auth.state().isAuthenticated}>
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

const AppRoot: Component<{
  datapoint: string;
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  return (
    <ErrorBoundary fallback={(error) => <ErrorFallback moduleName={props.title} error={error} />}>
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
    </ErrorBoundary>
  );
};

export default AppRoot;
