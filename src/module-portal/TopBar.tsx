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

const parseInitials = ({ firstName, lastName }: any) =>
  [firstName, lastName].reduce((acc, name) => {
    acc = acc + (name.length ? name[0] : '');
    return acc;
  }, '');

export const TopBar: Component<{ title: string }> = (props) => {
  const { t } = useI18n();
  const { profile, auth } = useService();

  return (
    <div class="top-bar">
      <menu>
        <Show when={auth.state().isAuthenticated}>
          <sl-avatar attr:initials={parseInitials(profile.state())} />
        </Show>
        <Locale />
        <Show when={(auth.state().isAuthenticated)}>
          <Logout />
        </Show>
      </menu>
      <h1>{t(props.title)}</h1>
    </div>
  );
};
