import { Component, createSignal, Show } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import { AuthenticationError } from '../lib/errors';
import { createStore } from 'solid-js/store';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

export const Login: Component<{ title: string }> = (props) => {
  const { actions } = useService();

  const [values, setValues] = createStore<{ email: string; pass: string }>(
    defaultCredentials
  );
  const [error, setError] = createSignal('');

  const updateValues = (key: string) => (evt: KeyboardEvent) => {
    console.log(key, evt.target.value);
    setValues(key, evt.target.value);
  };

  const handleSubmit = (method: 'signup' | 'signin'): void => {
    actions[method](values).catch((err) => {
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
        <sl-input
          attr:name="email"
          attr:label="Email"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
          attr:value={values.email}
          on:sl-change={updateValues('email')}
        />

        <sl-input
          attr:name="pass"
          attr:label="Password"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
          attr:value={values.pass}
          on:sl-change={updateValues('pass')}
        />
      </div>

      <Show when={error()}>{error()}</Show>

      <div>
        <sl-button
          onClick={() => handleSubmit('signup')}
          attr:variant="neutral"
        >
          Sign up
        </sl-button>

        <sl-button
          onClick={() => handleSubmit('signin')}
          attr:variant="primary"
        >
          Sign in
        </sl-button>
      </div>
    </div>
  );
};
