import {
  Component,
  Show,
  createMemo,
  from,
  Accessor
} from 'solid-js';

import { useI18n } from '../components/I18nProvider';
import { useService } from './ServiceProvider';

import { Logout } from './Logout';
import { Locale } from '../components/Locale';
import { TAuth } from '../services/AuthService';
import { TProfile } from '../services/ProfileService';

const parseInitials = ({ firstName, lastName }: any) =>
  [firstName, lastName].reduce((acc, name) => {
    acc = acc + (name.length ? name[0] : '');
    return acc;
  }, '');

export const TopBar: Component<{ title: string }> = (props) => {
  const { t } = useI18n();
  const { profile, auth } = useService();

  // Subscribe to service-updates
  const authState: Accessor<TAuth | undefined> = from(auth)
  const profileState: Accessor<TProfile | undefined> = from(profile)

  const isAuthenticated = () => authState()?.isAuthenticated
  const initials = createMemo(() => profileState() && parseInitials(profileState()));

  return (
    <div class="top-bar">
      <menu>
        <Show when={isAuthenticated()}>
          <sl-avatar attr:initials={initials()} />
        </Show>
        <Locale />
        <Show when={(isAuthenticated())}>
          <Logout />
        </Show>
      </menu>
      <h1>{t(props.title)}</h1>
    </div>
  );
};
