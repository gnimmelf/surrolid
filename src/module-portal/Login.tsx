import {
  Component,
  createEffect,
  createSignal,
  createResource,
  Show,
  Suspense,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { z } from 'zod';

import { useI18n } from '../components/I18nProvider';
import { useService } from './ServiceProvider';

import { Form, Input, FetchButton, FormError } from '../components/FormControls';
import { email, pass, validateValues } from '../lib/fields';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';

const Schema = z.object({
  email,
  pass,
});

type TSchema = z.infer<typeof Schema>;

const defaultCredentials = {
  email: 'flemming8@intergate.io',
  pass: 'flemming8',
};

export const Login: Component<{ title: string }> = () => {
  const { t } = useI18n();
  const { auth } = useService();

  const [store, setStore] = createStore<TSchema>(defaultCredentials);
  const [onSignup, doSignup] = createSignal<TSchema>();
  const [onSignin, doSignin] = createSignal<TSchema>();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [authenticate] = createResource(() => true, async () => await auth.authenticate())
  const [signin] = createResource(onSignin, (credentials) => auth.signin(credentials));
  const [signup] = createResource(onSignup, (credentials) => auth.signup(credentials));

  createEffect(async () => {
    if (signin.error) {
      console.warn(signin.error?.message)
      setErrors({
        formErrors: [
          t('Failed signing in'),
          t('Did you type your password and email correct?'),
        ],
      });
    }

    if (signup.error) {
      console.warn(signup.error?.message)
      setErrors({
        formErrors: [t('Failed signing up'), t('Did you already sign up?')],
      });
    }
  });

  const updateValue =
    (key: keyof TSchema) => (evt: DOMEvent<HTMLInputElement>) => {
      setStore(key, evt.target.value);
    };

  const isSubmiting = () => signin.loading || signup.loading;

  return (
    <section>
      <h2>{t('Sign in')}</h2>
      <Suspense fallback={<Loading />}>
        {noop(authenticate())}
        <Form
          onSubmit={() => doSignin(validateValues(Schema, store, setErrors))}
        >
          <Input
            label={t('Email')}
            type="text"
            inputmode="email"
            clearable={true}
            required={true}
            value={store.email}
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
            value={store.pass}
            errors={errors().fieldErrors?.pass}
            on:sl-change={updateValue('pass')}
            data-invalid={!!errors().fieldErrors?.pass || errors().formErrors}
            isSubmiting={isSubmiting()}
          />

          <FormError
            open={!!errors().formErrors?.length}
            message={errors().formErrors?.join('. ')}
          />


          <div>
            <FetchButton
              onClick={() =>
                doSignup(validateValues(Schema, store, setErrors))
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
