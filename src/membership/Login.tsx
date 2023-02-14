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
  email: z.string().email('Must be a valid email address'),
  pass: z
    .string()
    .min(3, 'Minimum 3 charcters, must contain both letters and numbers'),
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
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [signinData] = createResource(signin, actions.signin);
  const [signupData] = createResource(signup, actions.signup);

  createEffect(() => console.log(values, errors()));

  createEffect(async () => {
    if (signinData.error) {
      setErrors({
        formErrors: [
          t('Failed signing in'),
          t('Did you type your password and email correct?'),
        ],
      });
    }
  });

  createEffect(async () => {
    if (signupData.error) {
      setErrors({
        formErrors: [t('Failed signing up'), t('Did you already sign up?')],
      });
    }
  });

  const validateValues = () => {
    const res = Schema.safeParse(values);
    if (res.success) {
      return res.data;
    } else {
      // Remember to flatten!
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
          attr:label={t('Email')}
          attr:type="text"
          attr:inputmode="email"
          attr:clearable={true}
          attr:required={true}
          attr:value={values.email}
          on:sl-change={updateValues('email')}
          attr:data-invalid={
            !!errors().fieldErrors?.email || errors().formErrors
          }
        />

        <sl-input
          attr:label={t('Password')}
          attr:type="password"
          attr:inputmode="text"
          attr:password-toggle={true}
          attr:clearable={true}
          attr:required={true}
          attr:value={values.pass}
          on:sl-change={updateValues('pass')}
          attr:data-invalid={
            !!errors().fieldErrors?.pass || errors().formErrors
          }
        />

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}</div>
        </Show>
      </form>

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
