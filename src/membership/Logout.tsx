import { Component, createResource, createSignal } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from '../services/ServiceProvider';

import { FetchButton } from '../components/FormControls';

const Logout: Component = () => {
  const [t] = useI18n();
  const { auth } = useService();

  const [signout, setSignout] = createSignal();
  const [signoutData] = createResource(signout, auth.signout);

  return (
    <FetchButton
      isSubmiting={signoutData.loading}
      onClick={() => setSignout(true)}
      variant="primary"
    >
      {t('Sign out')}
    </FetchButton>
  );
};

export { Logout };
