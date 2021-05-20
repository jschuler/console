import * as React from 'react';
import { QuickStartDrawer as CMQuickStartDrawer } from '@cloudmosaic/quickstarts';
import QuickStartsLoader from './loader/QuickStartsLoader';

const QuickStartDrawer: React.FC = ({ children, ...props }) => (
  <QuickStartsLoader>
    {(quickStarts) => (
      <CMQuickStartDrawer quickStarts={quickStarts} {...props}>
        {children}
      </CMQuickStartDrawer>
    )}
  </QuickStartsLoader>
);

export default QuickStartDrawer;
