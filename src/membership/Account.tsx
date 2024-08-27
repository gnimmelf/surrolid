import {
  Accessor,
  Component,
  createEffect,
  createRenderEffect,
  createResource,
  createSignal,
  from,
  Show,
  Suspense,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { useI18n } from '../components/I18nProvider';
import { useService } from '../components/ServiceProvider';
import { Input, Form, FetchButton } from '../components/FormControls';
import { AccountSchema, TAccount } from '../services/AccountService';
import { validateValues } from '../lib/fields';
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';


export const Account: Component = () => {
  const { t } = useI18n();
  const { auth, account } = useService();

  const [onSave, doSave] = createSignal<TAccount>();
  const [store, setStore] = createStore(account.state as TAccount);

  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  // Subscribe to service-updates
  const accountState: Accessor<Omit<TAccount, "pass">  | undefined> = from(account)
  createRenderEffect(() => {
    const state = accountState()
    if (state) {
      setStore(state)
    }
  })

  const [loadData] = createResource(
    () => auth.isAuthenticated,
    () => account.loadData()
  );
  const [saveData] = createResource(onSave, (data: TAccount) => account.saveData(data));

  createEffect(async () => {
    if (saveData.error) {
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
            data-invalid={!!errors().fieldErrors?.email}
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
            data-invalid={!!errors().fieldErrors?.pass}
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
