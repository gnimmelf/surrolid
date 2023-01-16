import { Component, createSignal, createResource, Show, For } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

import { fetchToken, fetchQuery, Auth } from '../lib/db';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

const ACTIONS = Object.freeze({
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
});

export const Login: Component<{ title: string }> = (props) => {
  const { actions } = useService();

  const [credentials$, setCredentials] = createSignal(defaultCredentials);

  const [action$, setAction] = createSignal<string>('');
  const [auth$, setAuth$] = createSignal<Auth | undefined>();

  const [authTokenRes] = createResource(auth$, fetchToken);

  const [userRes] = createResource(authTokenRes, (result, info) => {
    console.log({ result, info });
    return fetchQuery(result.token, 'select email from user');
  });

  const doAction = (value: string) => {
    setAction(value);
    switch (value) {
      case ACTIONS.SIGNUP:
      case ACTIONS.SIGNIN:
        setAuth$({
          method: value.toLowerCase(),
          ...credentials$(),
        });
        break;
    }
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <div>
          <label for="email">Email</label>
        </div>
        <div>
          <input
            name="email"
            type="text"
            value={credentials$().email}
            onInput={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.currentTarget.value,
              }))
            }
          />
        </div>

        <div>
          <label for="pass">Pass</label>
        </div>

        <div>
          <input
            name="pass"
            type="text"
            value={credentials$().pass}
            onInput={(e) =>
              setCredentials((prev) => ({
                ...prev,
                pass: e.currentTarget.value,
              }))
            }
          />
        </div>
      </div>

      <div>
        <For each={Object.values(ACTIONS)}>
          {(value) => (
            <sl-button onClick={() => doAction(value)} variant="primary">
              {value}
            </sl-button>
          )}
        </For>
      </div>

      <Show when={auth$()}>
        <pre>auth$: {JSON.stringify(auth$(), null, 2)}</pre>
      </Show>

      <Show when={authTokenRes()}>
        <pre>authTokenRes: {JSON.stringify(authTokenRes(), null, 2)}</pre>
      </Show>

      <Show when={authTokenRes() && userRes()}>
        <pre>userRes: {JSON.stringify(userRes(), null, 2)}</pre>
      </Show>
    </div>
  );
};
