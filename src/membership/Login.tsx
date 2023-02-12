import {
  Component,
  createEffect,
  createSignal,
  createResource,
  Show,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';
import { z } from 'zod';
import '@shoelace-style/shoelace/dist/components/button/button';

import { TCredentials, useService } from '../lib/service';

const Schema = z.object({
  email: z.string().email(),
  pass: z.string().min(3),
});

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming8',
};

export const Login: Component<{ title: string }> = (props) => {
  const [t] = useI18n();
  const { actions } = useService();

  const [values, setValues] = createStore<TCredentials>(defaultCredentials);
  const [signup, setSignup] = createSignal();
  const [signin, setSignin] = createSignal();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: Record<string, any>;
  }>({});

  const [signinData] = createResource(signin, actions.signin);
  const [signupData] = createResource(signup, actions.signup);

  createEffect(async () => {
    if (signinData.error) {
      setErrors({
        formErrors: ['Failed signing in'],
      });
    }
  });

  createEffect(async () => {
    if (signupData.error) {
      setErrors({
        formErrors: ['Failed signing up'],
      });
    }
  });

  const validateValues = () => {
    const res = Schema.safeParse(values);
    if (res.success) {
      return res.data;
    } else {
      setErrors(res.error.flatten());
    }
  };

  const updateValues =
    (key: keyof TCredentials) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  return (
    <div>
      <h2>{t('Sign in')}</h2>
      <form>
        <sl-input
          attr:type="email"
          attr:label={t('Email')}
          attr:inputmode="email"
          attr:clearable={true}
          attr:required={true}
          attr:value={values.email}
          on:sl-change={updateValues('email')}
          attr:data-invalid={errors().fieldErrors?.email}
        />

        <sl-input
          attr:label={t('Password')}
          attr:type="password"
          attr:inputmode="text"
          attr:clearable={true}
          attr:required={true}
          attr:value={values.pass}
          on:sl-change={updateValues('pass')}
          attr:data-invalid={errors().fieldErrors?.pass}
        />
      </form>

      <Show when={errors().formErrors}>{errors().formErrors?.join(',')}</Show>

      <div>
        <sl-button
          onClick={() => setSignup(validateValues())}
          attr:variant="neutral"
        >
          {t('Sign up')}
        </sl-button>

        <sl-button
          onClick={() => setSignin(validateValues())}
          attr:variant="primary"
        >
          {t('Sign in')}
        </sl-button>
      </div>
    </div>
  );
};
