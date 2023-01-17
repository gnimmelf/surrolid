import { Component, createSignal } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

export const Login: Component<{ title: string }> = (props) => {
  const { state, actions } = useService();

  const [credentials, setCredentials] = createSignal(defaultCredentials);

  const [action, setAction] = createSignal<string>('');

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
            value={credentials().email}
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
            value={credentials().pass}
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
        <sl-button
          onClick={() => actions.signin(credentials())}
          variant="primary"
        >
          Signin
        </sl-button>

        <sl-button
          onClick={() => actions.signup(credentials())}
          variant="secondary"
        >
          Signup
        </sl-button>
      </div>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
