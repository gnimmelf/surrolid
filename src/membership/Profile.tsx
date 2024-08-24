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

import { useService } from '../components/ServiceProvider';
import { Input, Form, FetchButton } from '../components/FormControls';
import { ProfileSchema, TProfile } from '../services/ProfileService';
import { validateValues } from '../lib/fields';
import { noop } from '../lib/utils';
import { Loading } from '../components/Loading';

export const Profile: Component = () => {
  const [t] = useI18n();
  const { auth, profile } = useService();

  const [onSave, doSave] = createSignal<TProfile>();
  const [store, setStore] = createStore(profile.initialState);

  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      firstName?: string[];
      lastName?: string[];
      address?: string[];
      phone?: string[];
    };
  }>({});

  const [loadData] = createResource(
    () => auth.isAuthenticated,
    async () => {
      await profile.loadData()
      setStore(profile.state);
    }
  );
  const [saveData] = createResource(onSave, profile.saveData);

  createEffect(async () => {
    if (saveData.error) {
      setErrors({
        formErrors: [t('Error saving')],
      });
    }
  });

  const updateValue =
    (key: keyof TProfile) => (evt: DOMEvent<HTMLInputElement>) => {
      setStore(key, evt.target.value);
    };

  return (
    <section>
      <h2>{t('Profile')}</h2>
      <Suspense fallback={<Loading />}>
        {noop(loadData())}
        <Form
          onSubmit={() => doSave(validateValues(ProfileSchema, store, setErrors))}
        >
          <Input
            label={t('First name')}
            inputmode="text"
            autocapitalize="words"
            spellcheck={false}
            clearable={true}
            required={true}
            value={store.firstName}
            on:sl-change={updateValue('firstName')}
            data-invalid={!!errors().fieldErrors?.firstName}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.firstName}
          />

          <Input
            label={t('Last name')}
            inputmode="text"
            autocapitalize="words"
            spellcheck={false}
            clearable={true}
            required={true}
            value={store.lastName}
            on:sl-change={updateValue('lastName')}
            data-invalid={!!errors().fieldErrors?.lastName}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.lastName}
          />
          <Input
            label={t('Address')}
            inputmode="text"
            autocapitalize="words"
            spellcheck={false}
            clearable={true}
            required={false}
            value={store.address}
            on:sl-change={updateValue('address')}
            data-invalid={!!errors().fieldErrors?.address}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.address}
          />

          <Input
            label={t('Phone')}
            inputmode="numeric"
            spellcheck={false}
            clearable={true}
            value={store.phone}
            on:sl-change={updateValue('phone')}
            data-invalid={!!errors().fieldErrors?.phone}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.phone}
          />

          <Show when={errors().formErrors?.length}>
            <div class="form-error">{errors().formErrors?.join('. ')}.</div>
          </Show>

          <FetchButton
            type="submit"
            variant="primary"
            isSubmiting={saveData.loading}
          >
            {t('Save')}
          </FetchButton>
        </Form>
      </Suspense>
    </section>
  );
};
