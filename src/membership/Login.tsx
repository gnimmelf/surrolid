import { Component, createSignal, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import { AuthenticationError } from '../lib/errors';
import { createStore } from 'solid-js/store';

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming',
};

export const Login: Component<{ title: string }> = (props) => {
  const [t] = useI18n();
  const { actions } = useService();

  const [values, setValues] = createStore<{ email: string; pass: string }>(
    defaultCredentials
  );
  const [error, setError] = createSignal('');

  const updateValues = (key: string) => (evt: KeyboardEvent) => {
    setValues(key, evt.target.value);
  };

  const handleSubmit = (method: 'signup' | 'signin'): void => {
    actions[method](values).catch((err: ErrorEvent) => {
      if (err instanceof AuthenticationError) {
        setError(err.message);
      } else {
        throw err;
      }
    });
  };

  return (
    <div>
      <h2>{t('Sign in')}</h2>
      <div>
        <sl-input
          attr:label={t('Email')}
          attr:clearable={true}
          attr:required={true}
          attr:value={values.email}
          on:sl-change={updateValues('email')}
        />

        <sl-input
          attr:label={t('Password')}
          attr:clearable={true}
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
          {t('Sign up')}
        </sl-button>

        <sl-button
          onClick={() => handleSubmit('signin')}
          attr:variant="primary"
        >
          {t('Sign in')}
        </sl-button>
      </div>
    </div>
  );
};
