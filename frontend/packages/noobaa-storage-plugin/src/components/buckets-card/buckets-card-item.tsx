import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { humanizeNumber } from '@console/internal/components/utils';
import { PrometheusResponse } from '@console/internal/components/graphs';
import { getGaugeValue } from '../../utils';

const formatCount = (count: number, t: TFunction) => {
  const hCount = humanizeNumber(count).string;
  const pluralizeObject = t('noobaa-storage-plugin~Object', { count });
  return `${hCount} ${pluralizeObject}`;
};

export const BucketsTitle: React.FC<BucketsTitleProps> = ({ objects, link, error, children }) => {
  const { t } = useTranslation();

  let objectsBody: JSX.Element;

  if (!objects && !error) {
    objectsBody = <div className="skeleton-text" />;
  } else {
    const objectsCount = getGaugeValue(objects);
    objectsBody = (
      <div className="co-dashboard-text--small text-secondary">
        {!error && objectsCount
          ? formatCount(Number(objectsCount), t)
          : t('dashboard~Not available')}
      </div>
    );
  }
  return (
    <div className="nb-buckets-card__buckets-status-title">
      {link ? <Link to={link}>{children}</Link> : children}
      {objectsBody}
    </div>
  );
};

export type BucketsTitleProps = {
  objects: PrometheusResponse;
  link: string;
  error: boolean;
};
