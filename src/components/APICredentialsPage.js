import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Flex,
  FlexItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Icon,
  SearchInput
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@patternfly/react-table';
import {
  FilterIcon,
  EllipsisVIcon
} from '@patternfly/react-icons';

const CREDENTIAL_NAMES = [
  'Order Service Key',
  'Auth API Key',
  'Payment Gateway Credential',
  'Catalog API Key',
  'Inventory Sync Key',
  'Notification Service Key',
  'Analytics API Credential',
  'Customer Profile Key',
  'Shipping API Key',
  'Billing API Credential'
];

const STATUSES = ['Active', 'Pending', 'Active', 'Revoked', 'Active', 'Expired', 'Active', 'Pending', 'Active', 'Active'];
const TIERS = ['Bronze', 'Gold', 'Silver', 'Bronze', 'Gold', 'Silver', 'Bronze', 'Gold', 'Silver', 'Bronze'];
const REQUESTED_APIS = [
  'Order Service API',
  'User Authentication API',
  'Payment Gateway API',
  'Product Catalog API',
  'Inventory Management API',
  'Notification Service API',
  'Analytics Events API',
  'Customer Profile API',
  'Shipping & Fulfillment API',
  'Billing & Invoicing API'
];

const credentialsData = CREDENTIAL_NAMES.map((name, i) => ({
  id: `cred-${i}`,
  name,
  status: STATUSES[i],
  tier: TIERS[i],
  requestedApi: REQUESTED_APIS[i]
}));

const APICredentialsPage = () => {
  const [apiFilterOpen, setApiFilterOpen] = useState(false);
  const [tiersFilterOpen, setTiersFilterOpen] = useState(false);
  const [actionsOpenRowId, setActionsOpenRowId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const filteredCredentials = credentialsData.filter(
    (row) =>
      !searchValue ||
      row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.status.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.tier.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.requestedApi.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">My API keys</Title>
        <p style={{ marginTop: '8px', color: 'var(--pf-v5-global--Color--200)' }}>
          View the available API credentials you have and request new one.
        </p>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginTop: '24px' }}>
          <Dropdown
            isOpen={apiFilterOpen}
            onOpenChange={(open) => setApiFilterOpen(open)}
            onSelect={() => setApiFilterOpen(false)}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setApiFilterOpen((prev) => !prev)}
                isExpanded={apiFilterOpen}
                variant="default"
              >
                <Icon style={{ marginRight: '8px' }}>
                  <FilterIcon />
                </Icon>
                API
              </MenuToggle>
            )}
          >
            <DropdownList>
              {REQUESTED_APIS.map((api) => (
                <DropdownItem key={api}>{api}</DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
          <Dropdown
            isOpen={tiersFilterOpen}
            onOpenChange={(open) => setTiersFilterOpen(open)}
            onSelect={() => setTiersFilterOpen(false)}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setTiersFilterOpen((prev) => !prev)}
                isExpanded={tiersFilterOpen}
                variant="default"
              >
                <Icon style={{ marginRight: '8px' }}>
                  <FilterIcon />
                </Icon>
                Tiers
              </MenuToggle>
            )}
          >
            <DropdownList>
              {['Bronze', 'Gold', 'Silver'].map((t) => (
                <DropdownItem key={t}>{t}</DropdownItem>
              ))}
            </DropdownList>
          </Dropdown>
          <FlexItem grow={{ default: 'grow' }} style={{ minWidth: 0 }}>
            <SearchInput
              placeholder="Search.."
              value={searchValue}
              onChange={(_, value) => setSearchValue(value)}
              onClear={() => setSearchValue('')}
              style={{ width: '100%', maxWidth: '200px' }}
            />
          </FlexItem>
          <Button variant="primary">Request API keys</Button>
        </Flex>
      </PageSection>

      <PageSection>
        <Table aria-label="API credentials table">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Tiers</Th>
              <Th>Requested API</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {filteredCredentials.map((row) => (
              <Tr key={row.id}>
                <Td>
                  <Button variant="link" isInline component="a" href="#">
                    {row.name}
                  </Button>
                </Td>
                <Td>{row.status}</Td>
                <Td>{row.tier}</Td>
                <Td>
                  <Button variant="link" isInline component="a" href="#">
                    {row.requestedApi}
                  </Button>
                </Td>
                <Td>
                  <Dropdown
                    isOpen={actionsOpenRowId === row.id}
                    onOpenChange={(open) => setActionsOpenRowId(open ? row.id : null)}
                    onSelect={() => setActionsOpenRowId(null)}
                    toggle={(toggleRef) => (
                      <MenuToggle
                        ref={toggleRef}
                        aria-label="Actions"
                        variant="plain"
                        onClick={() => setActionsOpenRowId(actionsOpenRowId === row.id ? null : row.id)}
                      >
                        <EllipsisVIcon />
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      <DropdownItem key="view">View details</DropdownItem>
                      <DropdownItem key="revoke">Revoke</DropdownItem>
                      <DropdownItem key="regenerate">Regenerate</DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </>
  );
};

export default APICredentialsPage;
