import {
  Component,
  createEffect,
  createSignal,
  createResource,
  Show,
  Suspense,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';
import { z } from 'zod';

import { useService } from '../services/ServiceProvider';

import { Form, Input, FetchButton } from './FormControls';
import { email, pass, validateValues } from '../schema/fields';
import { Loading } from './Loading';
import { noop } from '../lib/utils';

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
  const { auth } = useService();

  const [values, setValues] = createStore<TSchema>(defaultCredentials);
  const [onSignup, doSignup] = createSignal<TSchema>();
  const [onSignin, doSignin] = createSignal<TSchema>();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [signin] = createResource(onSignin, auth.signin);
  const [signup] = createResource(onSignup, auth.signup);
  const [loadDetails] = createResource(
    () => !!auth.state.token,
    auth.loadDetails
  );

  createEffect(async () => {
    if (signin.error) {
      setErrors({
        formErrors: [
          t('Failed signing in'),
          t('Did you type your password and email correct?'),
        ],
      });
    }

    if (signup.error) {
      setErrors({
        formErrors: [t('Failed signing up'), t('Did you already sign up?')],
      });
    }
  });

  const updateValue =
    (key: keyof TSchema) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  const isSubmiting = () => signin.loading || signup.loading;

  return (
    <section>
      <h2>{t('Sign in')}</h2>
      <Suspense fallback={<Loading />}>
        {noop(loadDetails())}
        <Form
          onSubmit={() => doSignin(validateValues(Schema, values, setErrors))}
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
            on:sl-change={updateValue('email')}
            isSubmiting={isSubmiting()}
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
            on:sl-change={updateValue('pass')}
            data-invalid={!!errors().fieldErrors?.pass || errors().formErrors}
            isSubmiting={isSubmiting()}
          />

          <Show when={errors().formErrors?.length}>
            <div class="form-error">{errors().formErrors?.join('. ')}</div>
          </Show>

          <div>
            <FetchButton
              onClick={() =>
                doSignup(validateValues(Schema, values, setErrors))
              }
              isSubmiting={isSubmiting()}
              variant="neutral"
            >
              {t('Sign up')}
            </FetchButton>

            <FetchButton
              type="submit"
              variant="primary"
              isSubmiting={isSubmiting()}
            >
              {t('Sign in')}
            </FetchButton>
          </div>
        </Form>
      </Suspense>
    </section>
  );
};
