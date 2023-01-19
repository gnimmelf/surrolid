import { Component } from 'solid-js';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';

const Logout: Component = () => {
  const { state, actions } = useService();
  return (
    <sl-button onClick={() => actions.signout()} attr:variant="primary">
      Sign out
    </sl-button>
  );
};

export { Logout };
