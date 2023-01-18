import { Component, Show, onError, Suspense } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/tab-group/tab-group';
import '@shoelace-style/shoelace/dist/components/tab/tab';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel';

import { ServiceProvider, useService } from './service';

import { Login } from './Login';
import { Logout } from './Logout';
import { Profile } from './Profile';

import { Loading } from './Loading';

import styles from './app.css?inline';

const TBD = (props) => {
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
  const { state } = useService();
  return (
    <section>
      <style>{styles}</style>
      <div>
        <h1>{props.title}</h1>
        <Suspense fallback={<Loading />}>
          <Show when={!state.authenticated}>
            <Login title="Login" />
          </Show>
          <Show when={state.authenticated}>
            <Logout />
            <sl-tab-group>
              <sl-tab slot="nav" panel="profile">
                Profile
              </sl-tab>
              <sl-tab slot="nav" panel="account">
                Account
              </sl-tab>
              <sl-tab slot="nav" panel="contact">
                Contact
              </sl-tab>

              <sl-tab-panel name="profile">
                <Profile />
              </sl-tab-panel>
              <sl-tab-panel name="account">
                <TBD title="Account" />
              </sl-tab-panel>
              <sl-tab-panel name="contact">
                <TBD title="Contact" />
              </sl-tab-panel>
            </sl-tab-group>
          </Show>
        </Suspense>
      </div>
      <hr />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </section>
  );
};

const AppWrapper: Component<{
  title: string;
  namespace: string;
  database: string;
  scope: string;
}> = (props) => {
  onError((error) => console.warn(`onError: ${error}`));

  return (
    <ServiceProvider
      namespace={props.namespace}
      database={props.database}
      scope={props.scope}
    >
      <App title={props.title} />
    </ServiceProvider>
  );
};

export default AppWrapper;
