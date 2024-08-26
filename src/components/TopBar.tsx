import { Component, Show, createMemo, createEffect, from, Accessor } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from './ServiceProvider';

import { Logout } from './Logout';
import { Locale } from '../components/Locale';

const parseInitials = ({ firstName, lastName }: any) =>
  [firstName, lastName].reduce((acc, name) => {
    acc = acc + (name.length ? name[0] : '');
    return acc;
  }, '');

export const TopBar: Component<{ title: string }> = (props) => {
  const [t] = useI18n();
  const { profile, auth } = useService();

  const authState: Accessor<{ isAuthenticated: boolean } | undefined> = from(auth)
  const profileState: Accessor<{ isAuthenticated: boolean } | undefined> = from(profile)

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
