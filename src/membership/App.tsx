import { Component, Show, onError, ErrorBoundary, Suspense } from 'solid-js';

import { ServiceProvider } from './service';

import { Login } from './Login';

import { Loading } from './Loading';

import styles from './app.css?inline';

const App: Component<{ title: string }> = (props) => {
  onError((error) => console.warn(`onError: ${error}`));

  return (
    <section>
      <style>{styles}</style>
      <div>
        <h1>{props.title}</h1>
        <ErrorBoundary
          fallback={(error, reset) => (
            <>
              <div>{error.toString()}</div>
              <sl-button onClick={reset}>Reset</sl-button>
            </>
          )}
        >
          <ServiceProvider>
            <Suspense fallback={<Loading>Loading...</Loading>}>
              <Show when={true}>
                <Login title="Login" />
              </Show>
            </Suspense>
          </ServiceProvider>
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default App;
