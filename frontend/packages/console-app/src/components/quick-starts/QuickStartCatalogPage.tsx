import * as React from 'react';
import { QuickStartCatalogPage as PfQuickStartCatalogPage } from '@patternfly/quickstarts';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { LoadingBox } from '@console/internal/components/utils';
import QuickStartsLoader from './loader/QuickStartsLoader';
import { getLastLanguage } from '../user-preferences/language/getLastLanguage';

const QuickStartCatalogPage: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [lng, setLng] = React.useState(getLastLanguage() || 'en');
  
  const onLanguageChange = (lng: string) => {
    setLng(lng);
  };

  i18n.on('languageChanged', onLanguageChange);

  return (
    <>
      <Helmet>
        <title>{t('console-app~Quick Starts')}</title>
      </Helmet>
      <QuickStartsLoader lng={lng}>
        {(quickStarts, loaded) => {
          if (!loaded) {
            return <LoadingBox />;
          }
          return (
            <PfQuickStartCatalogPage
              quickStarts={quickStarts}
              showFilter
              title={t('console-app~Quick Starts')}
              hint={t(
                'console-app~Learn how to create, import, and run applications on OpenShift with step-by-step instructions and tasks.',
              )}
            />
          );
        }}
      </QuickStartsLoader>
    </>
  );
};

export default QuickStartCatalogPage;
