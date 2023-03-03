import { Component, createResource, createSignal } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from '../lib/service';

import { FetchButton } from '../components/FormControls';

const Logout: Component = () => {
  const [t] = useI18n();
  const { state, actions } = useService();

  const [signout, setSignout] = createSignal();
  const [signoutData] = createResource(signout, () =>
    actions.setAuthenticated(false)
  );

  return (
    <FetchButton
      isLoading={signoutData.loading}
      onClick={() => setSignout(true)}
      variant="primary"
    >
      {t('Sign out')}
    </FetchButton>
  );
};

export { Logout };
