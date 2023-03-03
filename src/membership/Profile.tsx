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

import { useService } from '../lib/service';

import { Input, Form, FetchButton } from '../components/FormControls';
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
        formErrors: ['Error saving'],
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
        <Input
          label={t('First name')}
          inputmode="text"
          autocapitalize="words"
          spellcheck={false}
          clearable={true}
          required={true}
          value={values.firstName}
          on:sl-change={updateValues('firstName')}
          data-invalid={!!errors().fieldErrors?.firstName}
          isLoading={saveProfile.loading}
          errors={errors().fieldErrors?.firstName}
        />

        <Input
          label={t('Last name')}
          inputmode="text"
          autocapitalize="words"
          spellcheck={false}
          clearable={true}
          required={true}
          value={values.lastName}
          on:sl-change={updateValues('lastName')}
          data-invalid={!!errors().fieldErrors?.lastName}
          isLoading={saveProfile.loading}
          errors={errors().fieldErrors?.lastName}
        />
        <Input
          label={t('Address')}
          inputmode="text"
          autocapitalize="words"
          spellcheck={false}
          clearable={true}
          required={false}
          value={values.address}
          on:sl-change={updateValues('address')}
          data-invalid={!!errors().fieldErrors?.address}
          isLoading={saveProfile.loading}
          errors={errors().fieldErrors?.address}
        />

        <Input
          label={t('Phone')}
          inputmode="numeric"
          spellcheck={false}
          clearable={true}
          value={values.phone}
          on:sl-change={updateValues('phone')}
          data-invalid={!!errors().fieldErrors?.phone}
          isLoading={saveProfile.loading}
          errors={errors().fieldErrors?.phone}
        />

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}</div>
        </Show>

        <FetchButton
          type="submit"
          variant="primary"
          isLoading={saveProfile.loading}
        >
          {t('Save')}
        </FetchButton>
      </Form>
    </section>
  );
};
