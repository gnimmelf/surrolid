import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';
import { z } from 'zod';

import { TService, useService } from '../services/ServiceProvider';
import { Input, Form, FetchButton } from '../components/FormControls';
import { email, pass, validateValues } from '../schema/fields';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';

const Schema = z.object({
  email,
  pass,
});

type TSchema = z.infer<typeof Schema>;

export const Account: Component = () => {
  const [t] = useI18n();
  const { auth, account } = useService() as TService;

  const [values, setValues] = createStore(account.state);
  const [save, setSave] = createSignal();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [loader] = createResource(auth.authenticated(), account.loadDetails);
  const [updater] = createResource(save, account.updateDetails);

  createEffect(async () => {
    if (updater.error) {
      setErrors({
        formErrors: [t('Error saving')],
      });
    }
    if (updater.state === 'ready') {
      setValues('pass', '');
    }
  });

  const updateValues =
    (key: keyof TSchema) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  return (
    <section>
      <h2>{t('Account')}</h2>
      <Suspense fallback={<Loading />}>
        {noop(loader())}
        <Form
          onSubmit={() => setSave(validateValues(Schema, values, setErrors))}
        >
          <Input
            label={t('Email')}
            inputmode="text"
            autocapitalize="words"
            spellcheck={false}
            clearable={true}
            required={true}
            value={values.email}
            on:sl-change={updateValues('email')}
            isSubmiting={updater.loading}
            errors={errors().fieldErrors?.email}
          />
          <Input
            label={t('Password')}
            inputmode="text"
            clearable={true}
            type="password"
            password-toggle={true}
            value={values.pass}
            on:sl-change={updateValues('pass')}
            isSubmiting={updater.loading}
            errors={errors().fieldErrors?.pass}
          />

          <Show when={errors().formErrors?.length}>
            <div class="form-error">{errors().formErrors?.join('. ')}.</div>
          </Show>

          <FetchButton
            type="submit"
            variant="primary"
            isSubmiting={updater.loading}
          >
            {t('Save')}
          </FetchButton>
        </Form>
      </Suspense>
    </section>
  );
};
