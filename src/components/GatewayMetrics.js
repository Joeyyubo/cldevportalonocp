import React from 'react';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Icon
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@patternfly/react-icons';

const GatewayMetrics = () => {
  return (
    <Grid hasGutter>
      <GridItem xl={4} lg={4} md={4} sm={12}>
        <Card>
          <CardBody>
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--pf-v5-global--color--100)' }}>
                  8
                </h1>
              </FlexItem>
              <FlexItem>
                <h3 style={{ fontWeight: 'bold', color: 'var(--pf-v5-global--color--200)' }}>
                  Total Gateways
                </h3>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      
      <GridItem xl={4} lg={4} md={4} sm={12}>
        <Card>
          <CardBody>
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Icon>
                      <CheckCircleIcon color="var(--pf-v5-global--success-color--100)" />
                    </Icon>
                  </FlexItem>
                  <FlexItem>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--pf-v5-global--color--100)' }}>
                      6
                    </h1>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <h3 style={{ fontWeight: 'bold', color: 'var(--pf-v5-global--color--200)' }}>
                  Healthy Gateways
                </h3>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      
      <GridItem xl={4} lg={4} md={4} sm={12}>
        <Card>
          <CardBody>
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsSm' }}>
              <FlexItem>
                <Flex spaceItems={{ default: 'spaceItemsXs' }} alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <Icon>
                      <ExclamationTriangleIcon color="var(--pf-v5-global--warning-color--100)" />
                    </Icon>
                  </FlexItem>
                  <FlexItem>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--pf-v5-global--color--100)' }}>
                      2
                    </h1>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <h3 style={{ fontWeight: 'bold', color: 'var(--pf-v5-global--color--200)' }}>
                  Unhealthy Gateways
                </h3>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default GatewayMetrics; 