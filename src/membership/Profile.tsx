import { Component } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '@solid-primitives/i18n';

import { useService, TProfile } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

const Profile: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [values, setValues] = createStore(state.profile);

  const updateValues = (key: keyof TProfile) => (evt: Event) => {
    setValues(key, (evt.target as HTMLInputElement).value);
  };

  const handleSubmit = (evt: Event) => {
    evt.preventDefault();
    actions.saveProfile({ ...values });
  };

  return (
    <section>
      <h2>{t('Profile')}</h2>

      <form onSubmit={handleSubmit}>
        <sl-input
          attr:label={t('First name')}
          attr:inputmode="text"
          attr:autocapitalize="words"
          attr:spellcheck={false}
          attr:clearable={true}
          attr:required={true}
          attr:value={values.firstName}
          on:sl-change={updateValues('firstName')}
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
        />
        <sl-input
          attr:label={t('Address')}
          attr:inputmode="text"
          attr:autocapitalize="words"
          attr:spellcheck={false}
          attr:clearable={true}
          attr:value={values.address}
          on:sl-change={updateValues('address')}
        />
        <sl-input
          attr:label={t('Phone')}
          attr:inputmode="numeric"
          attr:clearable={true}
          attr:value={values.phone}
          on:sl-change={updateValues('phone')}
        />
        <sl-button attr:variant="primary" attr:type="submit">
          {t('Save')}
        </sl-button>
      </form>
    </section>
  );
};

export { Profile };
