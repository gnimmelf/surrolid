import {
  Component,
  createEffect,
  createResource,
  createSignal,
  Show,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';
import { z } from 'zod';

import { TService, useService } from '../services/ServiceProvider';
import { Input, Form, FetchButton } from '../components/FormControls';
import { email, pass, validateValues } from '../schema/fields';

const Schema = z.object({
  email,
  pass,
});

type TSchema = z.infer<typeof Schema>;

export const Account: Component = () => {
  const [t] = useI18n();
  const { account } = useService() as TService;

  const [values, setValues] = createStore(account.state);
  const [save, setSave] = createSignal();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [updateAccount] = createResource(save, account.updateDetails);

  createEffect(async () => {
    if (updateAccount.error) {
      setErrors({
        formErrors: [t('Error saving')],
      });
    }
    if (updateAccount.state === 'ready') {
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

      <Form onSubmit={() => setSave(validateValues(Schema, values, setErrors))}>
        <Input
          label={t('Email')}
          inputmode="text"
          autocapitalize="words"
          spellcheck={false}
          clearable={true}
          required={true}
          value={values.email}
          on:sl-change={updateValues('email')}
          isLoading={updateAccount.loading}
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
          isLoading={updateAccount.loading}
          errors={errors().fieldErrors?.pass}
        />

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}.</div>
        </Show>

        <FetchButton
          type="submit"
          variant="primary"
          isLoading={updateAccount.loading}
        >
          {t('Save')}
        </FetchButton>
      </Form>
    </section>
  );
};
