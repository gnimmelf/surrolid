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
import { AccountSchema, TAccount } from '../services/AccountService';
import { validateValues } from '../lib/fields';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';


export const Account: Component = () => {
  const [t] = useI18n();
  const { auth, account } = useService();

  const [onSave, doSave] = createSignal<TAccount>();
  const [store, setStore] = createStore<TAccount>(account.initialState);

  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  const [loadData] = createResource(
    () => auth.isAuthenticated,
    async () => {
      await account.loadData()
      setStore(account.state);
    }
  );
  const [saveData] = createResource(onSave, account.saveData);

  createEffect(async () => {
    if (saveData.error) {
      console.log(saveData.error);
      setErrors({
        formErrors: [t('Error saving')],
      });
    }
    if (saveData.state === 'ready') {
      setStore('pass', '');
    }
  });

  const updateValue =
    (key: keyof TAccount) => (evt: DOMEvent<HTMLInputElement>) => {
      setStore(key, evt.target.value);
    };

  return (
    <section>
      <h2>{t('Account')}</h2>
      <Suspense fallback={<Loading />}>
        {noop(loadData())}
        <Form
          onSubmit={() => doSave(validateValues(AccountSchema, store, setErrors))}
        >
          <Input
            label={t('Email')}
            inputmode="text"
            autocapitalize="words"
            spellcheck={false}
            clearable={true}
            required={true}
            value={store.email}
            on:sl-change={updateValue('email')}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.email}
          />
          <Input
            label={t('Password')}
            inputmode="text"
            clearable={true}
            type="password"
            password-toggle={true}
            value={store.pass}
            on:sl-change={updateValue('pass')}
            isSubmiting={saveData.loading}
            errors={errors().fieldErrors?.pass}
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
