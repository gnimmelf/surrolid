import {
  Component,
  createEffect,
  createRenderEffect,
  createResource,
  createSignal,
  Suspense,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { useI18n } from '../components/I18nProvider';
import { useService } from './ServiceProvider';
import {
  Input,
  Form,
  FetchButton,
  FormError,
  FormSuccess
} from '../components/FormControls';
import { validateValues } from '../lib/fields';
import { noop } from '../lib/utils';
import { Loading } from '../components/Loading';
import { ProfileState, ProfileSchema } from '../services/ProfileService';

export const Profile: Component = () => {
  const { t } = useI18n();
  const { auth, profile } = useService();

  const [store, setStore] = createStore(profile.state());

  const [onSave, doSave] = createSignal<ProfileState>();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      firstName?: string[];
      lastName?: string[];
      address?: string[];
      phone?: string[];
    };
  }>({});

  createRenderEffect(() => {
    setStore(profile.state())
  })

  const [loadData] = createResource(
    () => auth.state().isAuthenticated,
    () => profile.loadData()
  );

  const [saveData] = createResource(
    () => onSave(),
    (data: ProfileState) => profile.saveData(data)
  );

  createEffect(async () => {
    if (saveData.loading) {
      setErrors({})
    }

    if (saveData.error) {
      setErrors({
        formErrors: [t('Error saving')],
      });
    }

    if (saveData.state === 'ready') {
      console.log("!")
    }
  });

  const updateValue =
    (key: keyof ProfileState) => (evt: DOMEvent<HTMLInputElement>) => {
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

          <FormError
            open={!!errors().formErrors?.length}
            message={errors().formErrors?.join('. ')}
          />

          <FormSuccess
            open={saveData.state === 'ready'}
            message={`Succesfulluy saved at ${new Date()}`}
            />

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
