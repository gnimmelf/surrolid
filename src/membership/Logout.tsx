import { Component, createResource, createSignal } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from '../lib/service';

import '@shoelace-style/shoelace/dist/components/button/button';

const Logout: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [signout, setSignout] = createSignal();
  const [signoutData] = createResource(signout, () =>
    actions.setAuthenticated(false)
  );

  return (
    <sl-button onClick={() => setSignout(true)} attr:variant="primary">
      {t('Sign out')}
    </sl-button>
  );
};

export { Logout };
