import { Component, Show, createMemo } from 'solid-js';
import {
  I18nContext,
  createI18nContext,
  useI18n,
} from '@solid-primitives/i18n';

import { useService } from './service';

import { Logout } from './Logout';
import { Locale } from './Locale';

const parseInitials = ({ firstName, lastName }) =>
  [firstName, lastName].reduce((acc, name) => {
    acc = acc + (name.length ? name[0] : '');
    return acc;
  }, '');

export const TopBar: Component<{ title: string }> = (props) => {
  const { state } = useService();

  const initials = createMemo(() => parseInitials(state.profile));

  return (
    <div class="top-bar">
      <menu>
        <sl-avatar attr:initials={initials()} />
        <Locale />
        <Show when={state.authenticated}>
          <Logout />
        </Show>
      </menu>
      <h1>{props.title}</h1>
    </div>
  );
};
