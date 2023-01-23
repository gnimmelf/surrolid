import { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/button/button';

const Logout: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();
  return (
    <sl-button onClick={() => actions.signout()} attr:variant="primary">
      {t('Sign out')}
    </sl-button>
  );
};

export { Logout };
