import {
  Component,
  createResource,
  createSignal
} from 'solid-js';

import { useI18n } from '../components/I18nProvider';
import { useService } from './ServiceProvider';

import { FetchButton } from '../components/FormControls';

const Logout: Component = () => {
  const { t } = useI18n();
  const { auth } = useService();

  const [onSignout, doSignout] = createSignal();
  const [signout] = createResource(onSignout, () => auth.signout());

  return (
    <FetchButton
      isSubmiting={signout.loading}
      onClick={() => doSignout(true)}
      variant="primary"
    >
      {t('Sign out')}
    </FetchButton>
  );
};

export { Logout };
