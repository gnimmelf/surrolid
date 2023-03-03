import { Component, Show, createMemo } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import '@shoelace-style/shoelace/dist/components/avatar/avatar';

import { useService } from '../lib/service';

import { Logout } from './Logout';
import { Locale } from '../components/Locale';

const parseInitials = ({ firstName, lastName }: any) =>
  [firstName, lastName].reduce((acc, name) => {
    acc = acc + (name.length ? name[0] : '');
    return acc;
  }, '');

export const TopBar: Component<{ title: string }> = (props) => {
  const [t] = useI18n();
  const { state } = useService();

  const initials = createMemo(() => parseInitials(state.profile));

  return (
    <div class="top-bar">
      <menu>
        <Show when={state.authenticated}>
          <sl-avatar attr:initials={initials()} />
        </Show>
        <Locale />
        <Show when={state.authenticated}>
          <Logout />
        </Show>
      </menu>
      <h1>{t(props.title)}</h1>
    </div>
  );
};
