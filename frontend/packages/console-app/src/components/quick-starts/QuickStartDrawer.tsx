import * as React from 'react';
import { QuickStartDrawer as PfQuickStartDrawer } from '@patternfly/quickstarts';
import { LoadingBox } from '@console/internal/components/utils';
import QuickStartsLoader from './loader/QuickStartsLoader';
import { useTranslation } from 'react-i18next';
import { getLastLanguage } from '../user-preferences/language/getLastLanguage';

const QuickStartDrawer: React.FC = ({ children, ...props }) => {
  const { i18n } = useTranslation();
  const [lng, setLng] = React.useState(getLastLanguage() || 'en');
  
  const onLanguageChange = (lng: string) => {
    setLng(lng);
  };

  i18n.on('languageChanged', onLanguageChange);

  return (
    <QuickStartsLoader lng={lng}>
      {(quickStarts, loaded) => {
      if (!loaded) {
        return <LoadingBox />;
      }
      const qs = quickStarts.filter(qs => qs.metadata.name === 'add-healthchecks');
      console.log(qs);
      return (
        <PfQuickStartDrawer quickStarts={quickStarts} {...props}>
            {children}
        </PfQuickStartDrawer>
      )
    }}
  </QuickStartsLoader>
  )
};

export default QuickStartDrawer;
