import { Component, createMemo, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useService } from './service';

import '@shoelace-style/shoelace/dist/components/select/select';
import '@shoelace-style/shoelace/dist/components/option/option';
import { getBrowserLocales } from '../lib/utils';

export const Locale: Component = (props) => {
  const [t, { locale, dict }] = useI18n();
  const { state } = useService();

  const browserLangs = getBrowserLocales({ languageCodeOnly: true });
  const defaultCode = dict(browserLangs[0] || '') ? browserLangs[0] : 'no';

  const selectedLang = createMemo(() =>
    state.langs.find(({ code }) => code === locale())
  );

  locale(selectedLang()?.code);

  return (
    <div>
      <sl-select
        attr:value={selectedLang()?.code}
        on:sl-change={(evt) => {
          locale(evt.target.value);
        }}
      >
        <For each={state.langs}>
          {(item) => <sl-option attr:value={item.code}>{item.name}</sl-option>}
        </For>
      </sl-select>
    </div>
  );
};
