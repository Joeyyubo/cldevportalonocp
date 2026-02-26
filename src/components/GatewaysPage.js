import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Flex,
  FlexItem,
  Tabs,
  Tab,
  TabTitleText,
  Button
} from '@patternfly/react-core';

import GatewayTable from './GatewayTable';

const GatewaysPage = ({ onGatewayNameClick, onCreateGateway }) => {
  const [activeTabKey, setActiveTabKey] = useState('all-gateways');

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">
          Gateways
        </Title>
      </PageSection>
      
      <PageSection>
        <Tabs
          activeKey={activeTabKey}
          onSelect={handleTabClick}
          style={{ marginBottom: '24px' }}
        >
          <Tab eventKey="all-gateways" title={<TabTitleText>All gateways</TabTitleText>} />
          <Tab eventKey="api-gateways" title={<TabTitleText>API gateways</TabTitleText>} />
          <Tab eventKey="ai-gateways" title={<TabTitleText>AI gateways</TabTitleText>} />
          <Tab eventKey="mcp-gateways" title={<TabTitleText>MCP gateways</TabTitleText>} />
        </Tabs>
        
        <Flex justifyContent={{ default: 'justifyContentFlexEnd' }} style={{ marginBottom: '16px' }}>
          <FlexItem>
            <Button variant="primary" onClick={onCreateGateway}>
              Create Gateway
            </Button>
          </FlexItem>
        </Flex>
        
        <GatewayTable onGatewayNameClick={onGatewayNameClick} activeTabKey={activeTabKey} />
      </PageSection>
    </>
  );
};

export default GatewaysPage; 