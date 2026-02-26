import React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

const ObservabilityPage = () => (
  <PageSection variant="light">
    <Title headingLevel="h1" size="2xl">Observability</Title>
    <p style={{ marginTop: '16px', color: '#6a6e73' }}>Monitor metrics, logs, and traces for your APIs usage.</p>
  </PageSection>
);

export default ObservabilityPage;
