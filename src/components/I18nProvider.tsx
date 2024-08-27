import {
  Component,
  JSXElement,
  createContext,
  createResource,
  createSignal,
  useContext
} from 'solid-js';
import * as i18n from "@solid-primitives/i18n";

import noTexts from '../locale/no-nb.json';

type TI18nProvider = {
  t: (key: string) => string
  locale: () => string
  setLocale: (langCode: string) => void
}

const LOCALES = [
  {
    code: 'no',
    name: 'norsk',
    dict: noTexts,
  },
  {
    code: 'en',
    name: 'english',
    dict: Object.keys(noTexts).reduce(
      (acc, key) => ({ ...acc, [key]: key }),
      []
    ),
  },
];

const dictionaries = LOCALES.reduce(
  (acc, { code, dict }) => ({ ...acc, [code]: dict }),
  {}
);

const I18nContext = createContext<TI18nProvider>();

export const i18nLangs = LOCALES.map(({ code, name }) => ({ code, name }));

export const I18nProvider: Component<{
  children: JSXElement
}> = (props) => {

  const [locale, setLocale] = createSignal<string>('en')
  const [dictionary] = createResource<i18n.BaseRecordDict, string>(
    locale,
    (langCode: string) => {
      console.log({ langCode })
      //@ts-ignore
      return dictionaries[langCode]
    }
  );

  const translate = (key: string) => {
    const t = i18n.translator(dictionary)
    const text = t(key)
    if (!text) {
      console.info(`i18nProvider: Missing text for '${key}'(${locale()})`)
    }
    return text
  }

  const provided = {
    t: translate,
    setLocale,
    locale
  }

  return (
    <I18nContext.Provider value={provided}>
      {props.children}
    </I18nContext.Provider>
  )
};

export const useI18n = () => {
  return useContext(I18nContext) as TI18nProvider;
}


