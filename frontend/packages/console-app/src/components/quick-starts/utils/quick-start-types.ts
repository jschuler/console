import { AccessReviewResourceAttributes } from '@console/internal/module/k8s';
import { QuickStartTask } from '@cloudmosaic/quickstarts';

// export type QuickStart = {
//   apiVersion: string;
//   kind: string;
//   metadata: ObjectMetadata;
//   spec: QuickStartSpec;
// };

export type QuickStartSpec = {
  version: number;
  displayName: string;
  durationMinutes: number;
  icon: string;
  description: string;
  prerequisites?: string[];
  introduction?: string;
  tasks?: QuickStartTask[];
  conclusion?: string;
  nextQuickStart?: string[];
  accessReviewResources?: AccessReviewResourceAttributes[];
};

export { QuickStartTask } from '@cloudmosaic/quickstarts';

export { QuickStartTaskReview } from '@cloudmosaic/quickstarts';

export type QuickStartTaskSummary = {
  success?: string;
  failed?: string;
};

export type AllQuickStartStates = Record<string, QuickStartState>;

export type QuickStartState = Record<string, string | number | QuickStartStatus>;

export enum QuickStartStatus {
  COMPLETE = 'Complete',
  IN_PROGRESS = 'In Progress',
  NOT_STARTED = 'Not started',
}

export enum QuickStartTaskStatus {
  INIT = 'Initial',
  VISITED = 'Visited',
  REVIEW = 'Review',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}
