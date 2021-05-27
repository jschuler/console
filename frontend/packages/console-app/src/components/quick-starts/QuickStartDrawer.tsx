import * as React from 'react';
import { QuickStartDrawer as CMQuickStartDrawer } from '@cloudmosaic/quickstarts';
import QuickStartsLoader from './loader/QuickStartsLoader';

const QuickStartDrawer: React.FC = ({ children, ...props }) => (
  <CMQuickStartDrawer LoaderComponent={QuickStartsLoader} {...props}>
    {children}
  </CMQuickStartDrawer>
);

export default QuickStartDrawer;
