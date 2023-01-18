import { Component } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button.js';

const Logout: Component = () => {
  const { state, actions } = useService();
  return (
    <sl-button onClick={() => actions.signout()} variant="primary">
      Sign out
    </sl-button>
  );
};

export { Logout };
