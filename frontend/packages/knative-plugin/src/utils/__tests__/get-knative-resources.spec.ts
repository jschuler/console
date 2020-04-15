import { FirehoseResource } from '@console/internal/components/utils';
import { MockResources } from '@console/dev-console/src/components/topology/__tests__/topology-test-data';
import { MockKnativeResources } from '../../topology/__tests__/topology-knative-test-data';
import {
  getKnativeServingRevisions,
  getKnativeServingConfigurations,
  getKnativeServingRoutes,
  getKnativeServingServices,
  getEventSourceCronjob,
  getEventSourceContainer,
  getEventSourceCamel,
  getEventSourceKafka,
  getEventSourceSinkBinding,
  knativeServingResourcesServices,
  knativeServingResourcesRevision,
  knativeServingResourcesConfigurations,
  knativeServingResourcesRoutes,
} from '../get-knative-resources';
import {
  deploymentData,
  deploymentKnativeData,
  deploymentKnativeEventData,
  deploymentKnativeEventSourceCamelEventData,
  deploymentKnativeEventSourceContainerEventData,
  deploymentKnativeEventSourceKafkaEventData,
  deploymentKnativeEventSourceSinkBindingEventData,
} from './knative-serving-data';

describe('Get knative resources', () => {
  describe('knative Serving Resources', () => {
    it('expect getKnativeServingRevisions to return revision data', () => {
      const knServingRevResource = getKnativeServingRevisions(
        deploymentKnativeData,
        MockKnativeResources,
      );
      expect(knServingRevResource.revisions).toBeDefined();
      expect(knServingRevResource.revisions).toHaveLength(1);
    });
    it('expect getKnativeServingRevisions to return revision as undefined', () => {
      const knServingResource = getKnativeServingRevisions(deploymentData, MockResources);
      expect(knServingResource).toBeUndefined();
    });
    it('expect getKnativeServingConfigurations to return configuration data', () => {
      const knServingResource = getKnativeServingConfigurations(
        deploymentKnativeData,
        MockKnativeResources,
      );
      expect(knServingResource.configurations).toBeDefined();
      expect(knServingResource.configurations).toHaveLength(1);
    });
    it('expect getKnativeServingConfigurations to return configuration as undefined', () => {
      const knServingResource = getKnativeServingConfigurations(deploymentData, MockResources);
      expect(knServingResource).toBeUndefined();
    });
    it('expect getKnativeServingRoutes to return route data', () => {
      const knServingResource = getKnativeServingRoutes(
        deploymentKnativeData,
        MockKnativeResources,
      );
      expect(knServingResource.ksroutes).toBeDefined();
      expect(knServingResource.ksroutes).toHaveLength(1);
    });
    it('expect getKnativeServingRoutes to return route as undefined', () => {
      const knServingResource = getKnativeServingRoutes(deploymentData, MockResources);
      expect(knServingResource).toBeUndefined();
    });
    it('expect getKnativeServingServices to return service data', () => {
      const knServingResource = getKnativeServingServices(
        deploymentKnativeData,
        MockKnativeResources,
      );
      expect(knServingResource.ksservices).toBeDefined();
      expect(knServingResource.ksservices).toHaveLength(1);
    });
    it('expect getKnativeServingServices to return service as undefined', () => {
      const knServingResource = getKnativeServingServices(deploymentData, MockResources);
      expect(knServingResource).toBeUndefined();
    });
    it('expect getEventSourceCronjob to return event source data', () => {
      const knEventResource = getEventSourceCronjob(
        deploymentKnativeEventData,
        MockKnativeResources,
      );
      expect(knEventResource.eventSourceCronjob).toBeDefined();
      expect(knEventResource.eventSourceCronjob).toHaveLength(1);
    });
    it('expect getEventSourceCronjob to return event source as undefined', () => {
      const knEventResource = getKnativeServingServices(deploymentData, MockResources);
      expect(knEventResource).toBeUndefined();
    });
    it('expect getEventSourceContainer to return event source data', () => {
      const knEventResource = getEventSourceContainer(
        deploymentKnativeEventSourceContainerEventData,
        MockKnativeResources,
      );
      expect(knEventResource.eventSourceContainers).toBeDefined();
      expect(knEventResource.eventSourceContainers).toHaveLength(1);
    });
    it('expect getEventSourceContainer to return event source as undefined', () => {
      const knEventResource = getEventSourceContainer(deploymentData, MockResources);
      expect(knEventResource).toBeUndefined();
    });
    it('expect getEventSourceCamel to return event source data', () => {
      const knEventResource = getEventSourceCamel(
        deploymentKnativeEventSourceCamelEventData,
        MockKnativeResources,
      );
      expect(knEventResource.eventSourceCamel).toBeDefined();
      expect(knEventResource.eventSourceCamel).toHaveLength(1);
    });
    it('expect getEventSourceCamel to return event source as undefined', () => {
      const knEventResource = getEventSourceCamel(deploymentData, MockResources);
      expect(knEventResource).toBeUndefined();
    });
    it('expect getEventSourceKafka to return event source data', () => {
      const knEventResource = getEventSourceKafka(
        deploymentKnativeEventSourceKafkaEventData,
        MockKnativeResources,
      );
      expect(knEventResource.eventSourceKafka).toBeDefined();
      expect(knEventResource.eventSourceKafka).toHaveLength(1);
    });
    it('expect getEventSourceKafka to return event source as undefined', () => {
      const knEventResource = getEventSourceKafka(deploymentData, MockResources);
      expect(knEventResource).toBeUndefined();
    });
    it('expect getEventSourceSinkBinding to return event source data', () => {
      const knEventResource = getEventSourceSinkBinding(
        deploymentKnativeEventSourceSinkBindingEventData,
        MockKnativeResources,
      );
      expect(knEventResource.eventSourceServicebinding).toBeDefined();
      expect(knEventResource.eventSourceServicebinding).toHaveLength(1);
    });
    it('expect getEventSourceSinkBinding to return event source as undefined', () => {
      const knEventResource = getEventSourceSinkBinding(deploymentData, MockResources);
      expect(knEventResource).toBeUndefined();
    });
  });

  describe('knative Serving Resources', () => {
    const SAMPLE_NAMESPACE = 'mynamespace';
    it('expect knativeServingResource to return service with proper namespace', () => {
      const serviceServingResource: FirehoseResource[] = knativeServingResourcesServices(
        SAMPLE_NAMESPACE,
      );
      expect(serviceServingResource).toHaveLength(1);
      expect(serviceServingResource[0].namespace).toBe(SAMPLE_NAMESPACE);
      expect(serviceServingResource[0].prop).toBe('ksservices');
    });

    it('expect knativeServingResourcesRevision to return revision with proper namespace', () => {
      const revisionServingResource: FirehoseResource[] = knativeServingResourcesRevision(
        SAMPLE_NAMESPACE,
      );
      expect(revisionServingResource).toHaveLength(1);
      expect(revisionServingResource[0].namespace).toBe(SAMPLE_NAMESPACE);
      expect(revisionServingResource[0].prop).toBe('revisions');
    });

    it('expect knativeServingResourcesConfigurations to return configurations with proper namespace', () => {
      const configServingResource: FirehoseResource[] = knativeServingResourcesConfigurations(
        SAMPLE_NAMESPACE,
      );
      expect(configServingResource).toHaveLength(1);
      expect(configServingResource[0].namespace).toBe(SAMPLE_NAMESPACE);
      expect(configServingResource[0].prop).toBe('configurations');
    });

    it('expect knativeServingResourcesRoutes to return routes with proper namespace', () => {
      const routeServingResource: FirehoseResource[] = knativeServingResourcesRoutes(
        SAMPLE_NAMESPACE,
      );
      expect(routeServingResource).toHaveLength(1);
      expect(routeServingResource[0].namespace).toBe(SAMPLE_NAMESPACE);
      expect(routeServingResource[0].prop).toBe('ksroutes');
    });
  });
});
