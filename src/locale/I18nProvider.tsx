import { children, Component, JSXElement } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import noTexts from './no-nb.json';

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

const i18nDict = LOCALES.reduce(
  (acc, { code, dict }) => ({ ...acc, [code]: dict }),
  {}
);

const i18nLangs = LOCALES.map(({ code, name }) => ({ code, name }));

const I18nProvider: Component<{ children: JSXElement }> = (props) => (
  <I18nContext.Provider value={createI18nContext(i18nDict)}>
    {props.children}
  </I18nContext.Provider>
);

export { I18nProvider, i18nLangs };
