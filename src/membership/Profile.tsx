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

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

import { useService } from '../lib/service';

import { Field, Form } from '../components/Field';
import { name, address, phone, validateValues } from '../schema/fields';

const Schema = z.object({
  firstName: name,
  lastName: name,
  address,
  phone,
});

type TSchema = z.infer<typeof Schema>;

export const Profile: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [values, setValues] = createStore(state.profile);
  const [save, setSave] = createSignal();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      firstName?: string[];
      lastName?: string[];
      address?: string[];
      phone?: string[];
    };
  }>({});

  const [saveProfile] = createResource(save, actions.saveProfile);

  createEffect(async () => {
    if (saveProfile.error) {
      setErrors({
        formErrors: ['Error saving profile'],
      });
    }
  });

  const updateValues =
    (key: keyof TSchema) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  return (
    <section>
      <h2>{t('Profile')}</h2>

      <Form onSubmit={() => setSave(validateValues(Schema, values, setErrors))}>
        <Field errors={errors().fieldErrors?.firstName}>
          <sl-input
            attr:label={t('First name')}
            attr:inputmode="text"
            attr:autocapitalize="words"
            attr:spellcheck={false}
            attr:clearable={true}
            attr:required={true}
            attr:value={values.firstName}
            on:sl-change={updateValues('firstName')}
            attr:data-invalid={!!errors().fieldErrors?.firstName}
          ></sl-input>
        </Field>
        <Field errors={errors().fieldErrors?.lastName}>
          <sl-input
            attr:label={t('Last name')}
            attr:inputmode="text"
            attr:autocapitalize="words"
            attr:spellcheck={false}
            attr:clearable={true}
            attr:required={true}
            attr:value={values.lastName}
            on:sl-change={updateValues('lastName')}
            attr:data-invalid={!!errors().fieldErrors?.lastName}
          ></sl-input>
        </Field>
        <Field errors={errors().fieldErrors?.address}>
          <sl-input
            attr:label={t('Address')}
            attr:inputmode="text"
            attr:autocapitalize="words"
            attr:spellcheck={false}
            attr:clearable={true}
            attr:value={values.address}
            on:sl-change={updateValues('address')}
            attr:data-invalid={!!errors().fieldErrors?.address}
          ></sl-input>
        </Field>
        <Field errors={errors().fieldErrors?.phone}>
          <sl-input
            attr:label={t('Phone')}
            attr:inputmode="numeric"
            attr:spellcheck={false}
            attr:clearable={true}
            attr:value={values.phone}
            on:sl-change={updateValues('phone')}
            attr:data-invalid={!!errors().fieldErrors?.phone}
          ></sl-input>
        </Field>

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}</div>
        </Show>

        <sl-button attr:type="submit" attr:variant="primary">
          {t('Save')}
        </sl-button>
      </Form>
    </section>
  );
};
