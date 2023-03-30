import { Component, Show, createMemo, createEffect } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { useService } from '../services/ServiceProvider';

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

  const initials = createMemo(() => parseInitials(profile.state));

  return (
    <div class="top-bar">
      <menu>
        <Show when={auth.authenticated()}>
          <sl-avatar attr:initials={initials()} />
        </Show>
        <Locale />
        <Show when={auth.authenticated()}>
          <Logout />
        </Show>
      </menu>
      <h1>{t(props.title)}</h1>
    </div>
  );
};
