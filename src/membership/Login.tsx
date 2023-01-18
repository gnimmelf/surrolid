import { Component, createSignal, Show } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import { AuthenticationError } from '../lib/errors';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

export const Login: Component<{ title: string }> = (props) => {
  const { actions } = useService();

  const [credentials, setCredentials] = createSignal(defaultCredentials);
  const [error, setError] = createSignal('');

  const handleSubmit = (method: 'signup' | 'signin'): void => {
    actions[method](credentials()).catch((err) => {
      if (err instanceof AuthenticationError) {
        setError(err.message);
      } else {
        throw err;
      }
    });
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

      <Show when={error()}>{error()}</Show>

      <div>
        <sl-button onClick={() => handleSubmit('signin')} variant="primary">
          Signin
        </sl-button>

        <sl-button onClick={() => handleSubmit('signup')} variant="secondary">
          Signup
        </sl-button>
      </div>
    </div>
  );
};
