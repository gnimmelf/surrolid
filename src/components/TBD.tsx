import { useI18n } from "./I18nProvider";

export const TBD = (props: { title: string }) => {
  const { t } = useI18n()
  return (
    <section>
      <h2>{props.title}</h2>
      <p>{t('Not implemented')}!</p>
    </section>
  );
};
