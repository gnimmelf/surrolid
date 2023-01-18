import { Component, createComputed, createResource } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

const Profile: Component = () => {
  const { state, actions } = useService();
  createComputed(() => actions.getProfile());
  return (
    <section>
      <h2>Profile</h2>
      <pre>{JSON.stringify(state.profile, null, 2)}</pre>
    </section>
  );
};

export { Profile };
