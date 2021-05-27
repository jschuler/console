import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { LoadingBox } from '@console/internal/components/utils';
import { QuickStartCatalogPage as CMQuickStartCatalogPage } from '@cloudmosaic/quickstarts';
import QuickStartsLoader from './loader/QuickStartsLoader';

const QuickStartCatalogPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('public~Quick Starts')}</title>
      </Helmet>
      <QuickStartsLoader>
        {(quickStarts, loaded) =>
          loaded ? (
            <CMQuickStartCatalogPage
              quickStarts={quickStarts}
              showFilter
              title={t('public~Quick Starts')}
              hint={t(
                'public~Learn how to create, import, and run applications on OpenShift with step-by-step instructions and tasks.',
              )}
            />
          ) : (
            <LoadingBox />
          )
        }
      </QuickStartsLoader>
    </>
  );
};

export default QuickStartCatalogPage;
