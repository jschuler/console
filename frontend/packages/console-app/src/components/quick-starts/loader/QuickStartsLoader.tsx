import * as React from 'react';
import { QuickStart, isDisabledQuickStart, getDisabledQuickStarts } from '@patternfly/quickstarts';
import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
import { referenceForModel } from '@console/internal/module/k8s/k8s';
import { QuickStartModel } from '../../../models';
import QuickStartPermissionChecker from './QuickStartPermissionChecker';

type QuickStartsLoaderProps = {
  children: (quickStarts: QuickStart[], loaded: boolean) => React.ReactNode;
  lng?: string;
};

const QuickStartsLoader: React.FC<QuickStartsLoaderProps> = ({ children, lng = 'en' }) => {
  const [quickStarts, quickStartsLoaded] = useK8sWatchResource<QuickStart[]>({
    kind: referenceForModel(QuickStartModel),
    isList: true,
  });
  /*
    healthchecks: {
      en: q1,
      ja: q2,
    },
    explore-pipelines: {
      en: q1,
    },
  */
  const [quickStartsByName, setQuickStartsByName] = React.useState<any>({});

  const enabledQuickstarts = React.useMemo(() => {
    const disabledQuickStarts = getDisabledQuickStarts();
    return disabledQuickStarts?.length > 0
      ? quickStartsLoaded
        ? quickStarts.filter((qs) => !isDisabledQuickStart(qs, disabledQuickStarts))
        : []
      : quickStarts;
  }, [quickStarts, quickStartsLoaded]);

  const [allowedQuickStarts, setAllowedQuickStarts] = React.useState<QuickStart[]>([]);
  const [loaded, setLoaded] = React.useState<boolean>(!(enabledQuickstarts.length > 0));
  const permissionChecks = React.useRef<{ [name: string]: boolean }>({});

  React.useEffect(() => {
    const quickstartsByLng = [];
    for (const [key, value] of Object.entries(quickStartsByName)) {
      // console.log(`${key}: ${value}`);
      const qs = value[lng] || value['en'];
      // maintain state of the quick start across languages by removing the lng suffix
      if (qs.metadata.name.endsWith(`-${lng}`)) {
        qs.metadata.name = qs.metadata.name.replace(`-${lng}`, '');
      }
      quickstartsByLng.push(qs);
    }
    const qs = quickstartsByLng.filter(qs => qs.metadata.name === 'add-healthchecks');
    console.log(qs);
    setAllowedQuickStarts(quickstartsByLng);
    setLoaded(true);
  }, [lng, quickStartsByName]);

  const handlePermissionCheck = React.useCallback(
    (quickStart, hasPermission) => {
      permissionChecks.current[quickStart.metadata.name] = hasPermission;
      if (Object.keys(permissionChecks.current).length === enabledQuickstarts.length) {
        const filteredQuickStarts = enabledQuickstarts.filter(
          (quickstart) => permissionChecks.current[quickstart.metadata.name],
        );
        const quickstartsByName = {};
        filteredQuickStarts.forEach(qs => {
          const name = qs.metadata.labels?.name || qs.metadata.name;
          const lng = qs.metadata.labels?.lng || 'en';
          if (name in quickstartsByName) {
            quickstartsByName[name][lng] = qs;
          } else {
            quickstartsByName[name] = {
              [lng]: qs,
            };
          }
        });
        setQuickStartsByName(quickstartsByName);
      }
    },
    [enabledQuickstarts],
  );

  return (
    <>
      {enabledQuickstarts.map((quickstart) => {
        return (
          <QuickStartPermissionChecker
            key={quickstart.metadata.name}
            quickStart={quickstart}
            onPermissionCheck={handlePermissionCheck}
          />
        );
      })}
      {children(allowedQuickStarts, loaded)}
    </>
  );
};

export default QuickStartsLoader;
