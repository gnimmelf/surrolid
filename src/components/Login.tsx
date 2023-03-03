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

import { useService } from '../lib/service';

import { Form, Input, FetchButton } from './FormControls';
import { email, pass, validateValues } from '../schema/fields';

const Schema = z.object({
  email,
  pass,
});

type TSchema = z.infer<typeof Schema>;

const defaultCredentials = {
  email: 'flemming@intergate.io',
  pass: 'flemming8',
};

export const Login: Component<{ title: string }> = (props) => {
  const [t] = useI18n();
  const { actions, state } = useService();

  const [values, setValues] = createStore<TSchema>(defaultCredentials);
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
  const [userData] = createResource(
    // (Auto-)login on change to token
    () => state.conn.token,
    async (token) => {
      if (token) {
        await new Promise((r) => setTimeout(() => r(actions.loadUser()), 0));
      }
    }
  );

  createEffect(async () => {
    if (signinData.error) {
      console.log({ signinData });
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

  const updateValues =
    (key: keyof TSchema) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  const isLoading = () =>
    signinData.loading || signupData.loading || userData.loading;

  return (
    <section>
      <h2>{t('Sign in')}</h2>
      <Form
        onSubmit={() => setSignin(validateValues(Schema, values, setErrors))}
      >
        <Input
          label={t('Email')}
          type="text"
          inputmode="email"
          clearable={true}
          required={true}
          value={values.email}
          errors={errors().fieldErrors?.email}
          data-invalid={!!errors().fieldErrors?.email || errors().formErrors}
          on:sl-change={updateValues('email')}
          isLoading={isLoading()}
        />

        <Input
          label={t('Password')}
          type="password"
          inputmode="text"
          password-toggle={true}
          clearable={true}
          required={true}
          value={values.pass}
          errors={errors().fieldErrors?.pass}
          on:sl-change={updateValues('pass')}
          data-invalid={!!errors().fieldErrors?.pass || errors().formErrors}
          isLoading={isLoading()}
        />

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}</div>
        </Show>

        <div>
          <FetchButton
            onClick={() => setSignup(validateValues(Schema, values, setErrors))}
            isLoading={isLoading()}
            variant="neutral"
          >
            {t('Sign up')}
          </FetchButton>

          <FetchButton type="submit" variant="primary" isLoading={isLoading()}>
            {t('Sign in')}
          </FetchButton>
        </div>
      </Form>
    </section>
  );
};
