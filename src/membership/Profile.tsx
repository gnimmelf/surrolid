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

import { useService, TProfile } from '../lib/service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

const Schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(3).or(z.literal('')),
  phone: z.string().min(8).or(z.literal('')),
});

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

  createEffect(() => console.log(values, errors()));

  createEffect(async () => {
    if (saveProfile.error) {
      setErrors({
        formErrors: ['Error saving profile'],
      });
    }
  });

  const updateValues =
    (key: keyof TProfile) => (evt: DOMEvent<HTMLInputElement>) => {
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
      <h2>{t('Profile')}</h2>

      <form>
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
        />
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
        />
        <sl-input
          attr:label={t('Address')}
          attr:inputmode="text"
          attr:autocapitalize="words"
          attr:spellcheck={false}
          attr:clearable={true}
          attr:value={values.address}
          on:sl-change={updateValues('address')}
          attr:data-invalid={!!errors().fieldErrors?.address}
        />
        <sl-input
          attr:label={t('Phone')}
          attr:inputmode="numeric"
          attr:clearable={true}
          attr:value={values.phone}
          on:sl-change={updateValues('phone')}
          attr:data-invalid={!!errors().fieldErrors?.phone}
        />

        <Show when={errors().formErrors?.length}>
          <div class="form-error">{errors().formErrors?.join('. ')}</div>
        </Show>
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
