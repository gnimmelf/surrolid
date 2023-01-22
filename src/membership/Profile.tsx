import {
  Component,
  createComputed,
  createEffect,
  createMemo,
  createSignal,
  on,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { useService, Profile } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

const parseInitials = ({ firstName, lastName }) =>
  `${(firstName || '')[0]}${(lastName || '')[0]}`;

const Profile: Component = () => {
  const { state, actions } = useService();
  const { profile } = state;

  const [values, setValues] = createStore<Profile>(state.profile);

  const updateValues = (key: keyof Profile) => (evt: Event) => {
    setValues(key, (evt.target as HTMLInputElement).value);
  };

  const handleSubmit = (evt: Event) => {
    evt.preventDefault();
    actions.saveProfile({ ...values });
  };

  const initials = createMemo(() => parseInitials(values));

  return (
    <section>
      <h2>Profile</h2>
      <sl-avatar attr:initials={initials()} />
      <form onSubmit={handleSubmit}>
        <sl-input
          attr:name="firstName"
          attr:label="First name"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
          attr:value={values.firstName}
          on:sl-change={updateValues('firstName')}
        />
        <sl-input
          attr:name="lastName"
          attr:label="Last name"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
          attr:value={values.lastName}
          on:sl-change={updateValues('lastName')}
        />

        <sl-button attr:variant="primary" attr:type="submit">
          Submit
        </sl-button>
      </form>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </section>
  );
};

export { Profile };
