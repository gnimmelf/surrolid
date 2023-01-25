import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';

import { useService, TCredentials } from '../lib/service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/input/input';

export const Account: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [values, setValues] = createStore({
    email: state.account.email,
    pass: '',
  });

  const updateValues =
    (key: keyof TCredentials) => (evt: DOMEvent<HTMLInputElement>) => {
      setValues(key, evt.target.value);
    };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    actions.saveProfile({ ...values });
  };

  return (
    <section>
      <h2>{t('Profile')}</h2>

      <form onSubmit={handleSubmit}>
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
        <sl-input
          attr:label={t('Password')}
          attr:inputmode="text"
          attr:clearable={true}
          attr:type="password"
          attr:password-toggle={true}
          attr:value={values.pass}
          on:sl-change={updateValues('pass')}
        />
        <sl-button attr:variant="primary" attr:type="submit">
          {t('Save')}
        </sl-button>
      </form>
    </section>
  );
};
