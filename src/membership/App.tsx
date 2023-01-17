import { Component, Show, onError, Suspense } from 'solid-js';

import { ServiceProvider, useService } from './service';

import { Login } from './Login';
import { Logout } from './Logout';

import { Loading } from './Loading';

import styles from './app.css?inline';

const App: Component<{
  title: string;
}> = (props) => {
  const { state } = useService();
  return (
    <section>
      <style>{styles}</style>
      <div>
        <h1>{props.title}</h1>
        <Suspense fallback={<Loading>Loading...</Loading>}>
          <Show when={!state.conn.token}>
            <Login title="Login" />
          </Show>
          <Show when={state.conn.token}>
            <Logout />
          </Show>
        </Suspense>
      </div>
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
