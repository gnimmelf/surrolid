import { Component, createMemo, For } from 'solid-js';
import { i18nLangs, useI18n } from './I18nProvider';

const getBrowserLocales = (options = {}): Array<string> => {
  const defaultOptions = {
    languageCodeOnly: true,
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
  const { locale, setLocale } = useI18n();

  const setSelectedLocale = (langCode: string) => {
    localStorage.langCode = langCode;
    setLocale(langCode);
  };

  let defaultLocale = localStorage.langCode;
  if (!defaultLocale) {
    const browserLocales = getBrowserLocales();
    defaultLocale = browserLocales[0] ?? locale()
  }
  if (defaultLocale !== locale()) {
    setSelectedLocale(defaultLocale);
  }

  const selectedLang = createMemo(() =>
    i18nLangs.find(({ code }) => code === locale())
  );

  return (
    <div>
      <sl-select
        attr:value={selectedLang()?.code}
        on:sl-change={(evt: DOMEvent<HTMLSelectElement>) =>
          setSelectedLocale(evt.target.value)
        }
      >
        <For each={i18nLangs}>
          {(item) => <sl-option attr:value={item.code}>{item.name}</sl-option>}
        </For>
      </sl-select>
    </div>
  );
};
