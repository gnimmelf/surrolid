import { Component, createEffect, createRenderEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

const Profile: Component = () => {
  const { state, actions } = useService();
  const { profile } = state;

  const [values, setValues] = createStore(profile);

  const initials = createRenderEffect(() =>
    (values.firstName[0] + values.lastName[0] || '').toUpperCase()
  );

  const updateValues = (key: string) => (evt: KeyboardEvent) => {
    console.log(key, evt.target.value);
    setValues(key, evt.target.value);
  };

  const handleSubmit = (evt: Event) => {
    evt.preventDefault();
    actions.saveProfile({ ...values });
  };

  return (
    <section>
      <h2>Profile</h2>
      <sl-avatar attr:initials={initials} />
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
