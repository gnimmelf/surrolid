import { Component, createMemo, For } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { i18nLangs } from './I18nProvider';

import '@shoelace-style/shoelace/dist/components/select/select';
import '@shoelace-style/shoelace/dist/components/option/option';

const getBrowserLocales = (options = {}): Array<string> => {
  const defaultOptions = {
    languageCodeOnly: false,
  };
  const opt = {
    ...defaultOptions,
    ...options,
  };
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages;
  if (!browserLocales) {
    return [];
  }
  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();
    return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
  });
};

export const Locale: Component = (props) => {
  const [_t, { locale, dict }] = useI18n();

  const setLocale = (langCode: string) => {
    localStorage.langCode = langCode;
    locale(langCode);
  };

  let langCode = localStorage.langCode;
  if (!langCode) {
    const langCodes = getBrowserLocales({ languageCodeOnly: true });
    langCode = dict(langCodes[0] || '') ? langCodes[0] : 'no';
  }

  setLocale(langCode);

  const selectedLang = createMemo(() =>
    i18nLangs.find(({ code }) => code === locale())
  );

  return (
    <div>
      <sl-select
        attr:value={selectedLang()?.code}
        on:sl-change={(evt: DOMEvent<HTMLSelectElement>) =>
          setLocale(evt.target.value)
        }
      >
        <For each={i18nLangs}>
          {(item) => <sl-option attr:value={item.code}>{item.name}</sl-option>}
        </For>
      </sl-select>
    </div>
  );
};
