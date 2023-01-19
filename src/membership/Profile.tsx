import { Component, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createFormGroup, formGroup, Validators as V } from 'solar-forms';

import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';
import '@shoelace-style/shoelace/dist/components/avatar/avatar';
import '@shoelace-style/shoelace/dist/components/input/input';

const Profile: Component = () => {
  const { state, actions } = useService();
  const { profile } = state;

  //   createEffect(() => actions.loadUser());

  const [values, setValues] = createStore(state);

  const updateState = (key) => (ev) => setState(key, ev.target.value);

  const fg = createFormGroup({
    email: [state.email, { validators: [V.required] }],
    firstName: [state.firstName, { validators: [V.required] }],
    lastName: [state.lastName, { validators: [V.required] }],
    address: state.address,
    phone: state.phone,
  });

  const [form, setForm] = fg.value;
  const validAll = fg.validAll;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log({ evt });
  };

  return (
    <section>
      <h2>Profile</h2>
      <sl-avatar
        attr:initials={(
          profile.firstName[0] + profile.lastName[0] || ''
        ).toUpperCase()}
      />
      <form onSubmit={handleSubmit}>
        <sl-input
          attr:name="firstName"
          attr:label="First name"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
        />
        <sl-input
          attr:name="email"
          attr:label="Email"
          attr:clearable={true}
          attr:filled={true}
          attr:required={true}
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
