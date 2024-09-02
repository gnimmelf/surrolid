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
import { Loading } from '../components/Loading';
import { noop } from '../lib/utils';
import { AccountState, AccountSchema } from '../services/AccountService';


export const Account: Component = () => {
  const { t } = useI18n();
  const { auth, account } = useService();

  const [store, setStore] = createStore(account.state());

  const [onSave, doSave] = createSignal<AccountState>();
  const [errors, setErrors] = createSignal<{
    formErrors?: string[];
    fieldErrors?: {
      email?: string[];
      pass?: string[];
    };
  }>({});

  createRenderEffect(() => {
    setStore(account.state())
  })

  const [loadData] = createResource(
    () => auth.state().isAuthenticated,
    () => account.loadData()
  );

  const [saveData] = createResource(
    () => onSave(),
    (data: AccountState) => account.saveData(data)
  );

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
    (key: keyof AccountState) => (evt: DOMEvent<HTMLInputElement>) => {
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
