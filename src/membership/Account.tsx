import {
  Component,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';
import { z } from 'zod';
import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/input/input';

import { useService, TCredentials } from '../lib/service';
import { Field } from '../components/Field';

const Schema = z.object({
  email: z.string().email('Must be a valid email address'),
  pass: z
    .string()
    .min(3, 'Minimum 3 charcters, must contain both letters and numbers'),
});

export const Account: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [values, setValues] = createStore({
    email: state.account.email,
    pass: '',
  });
  const [save, setSave] = createSignal();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [saveAccount] = createResource(save, actions.saveAccount);

  createEffect(async () => {
    if (saveAccount.error) {
      setErrors({
        formErrors: ['Error saving profile'],
      });
    }
    if (saveAccount.state === 'ready') {
      setValues('pass', '');
    }
  });

  const updateValues =
    (key: keyof TCredentials) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  const validateValues = () => {
    const res = Schema.safeParse(values);
    if (res.success) {
      return res.data;
    } else {
      // Remember to flatten!
      setErrors(res.error.flatten());
    }
  };

  return (
    <section>
      <h2>{t('Account')}</h2>

      <form>
        <Field errors={errors().fieldErrors?.email}>
          <sl-input
            attr:label={t('Email')}
            attr:inputmode="text"
            attr:autocapitalize="words"
            attr:spellcheck={false}
            attr:clearable={true}
            attr:required={true}
            attr:value={values.email}
            on:sl-change={updateValues('email')}
          />
        </Field>
        <Field errors={errors().fieldErrors?.pass}>
          <sl-input
            attr:label={t('Password')}
            attr:inputmode="text"
            attr:clearable={true}
            attr:type="password"
            attr:password-toggle={true}
            attr:value={values.pass}
            on:sl-change={updateValues('pass')}
          />
        </Field>
      </form>

      <sl-button
        attr:variant="primary"
        onClick={() => setSave(validateValues())}
      >
        {t('Save')}
      </sl-button>
    </section>
  );
};
