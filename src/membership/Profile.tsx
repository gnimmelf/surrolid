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
import { name, address, phone, validateValues } from '../schema/fields';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';

const Schema = z.object({
  firstName: name,
  lastName: name,
  address,
  phone,
});

type TSchema = z.infer<typeof Schema>;

export const Profile: Component = () => {
  const [t] = useI18n();
  const { auth, profile } = useService() as TService;

  const [values, setValues] = createStore(profile.state);
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

  const [loader] = createResource(auth.authenticated(), profile.loadDetails);
  const [updater] = createResource(save, profile.updateDetails);

  createEffect(async () => {
    if (updater.error) {
      setErrors({
        formErrors: [t('Error saving')],
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
      <Suspense fallback={<Loading />}>
        {noop(loader())}
        <Form
          onSubmit={() => setSave(validateValues(Schema, values, setErrors))}
        >
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
            isSubmiting={updater.loading}
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
            isSubmiting={updater.loading}
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
            isSubmiting={updater.loading}
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
            isSubmiting={updater.loading}
            errors={errors().fieldErrors?.phone}
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
