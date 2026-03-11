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

const CLIENTS = ['Alice Chen', 'Bob Martinez', 'Carol Williams', 'David Kim', 'Eva Schmidt', 'Frank Brown', 'Grace Lee', 'Henry Wilson', 'Ivy Zhang', 'Jack Taylor'];
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
  client: CLIENTS[i],
  status: STATUSES[i],
  tier: TIERS[i],
  requestedApi: REQUESTED_APIS[i]
}));

const STATUS_OPTIONS = ['Active', 'Pending', 'Revoked', 'Expired'];
const TIER_OPTIONS = ['Bronze', 'Gold', 'Silver'];

const APIKeyApprovalsPage = () => {
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [tiersFilterOpen, setTiersFilterOpen] = useState(false);
  const [actionsOpenRowId, setActionsOpenRowId] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const filteredCredentials = credentialsData.filter(
    (row) =>
      !searchValue ||
      row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.status.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.tier.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.requestedApi.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.client.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">API key approval</Title>
        <p style={{ marginTop: '8px', color: 'var(--pf-v5-global--Color--200)' }}>
          Manage keys issued to clients for accessing APIs.
        </p>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginTop: '24px' }}>
          <Dropdown
            isOpen={statusFilterOpen}
            onOpenChange={(open) => setStatusFilterOpen(open)}
            onSelect={() => setStatusFilterOpen(false)}
            toggle={(toggleRef) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => setStatusFilterOpen((prev) => !prev)}
                isExpanded={statusFilterOpen}
                variant="default"
              >
                <Icon style={{ marginRight: '8px' }}>
                  <FilterIcon />
                </Icon>
                Status
              </MenuToggle>
            )}
          >
            <DropdownList>
              {STATUS_OPTIONS.map((status) => (
                <DropdownItem key={status}>{status}</DropdownItem>
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
              {TIER_OPTIONS.map((t) => (
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
        </Flex>
      </PageSection>

      <PageSection>
        <Table aria-label="API credentials table">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Client</Th>
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
                <Td>{row.client}</Td>
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
                      <DropdownItem key="approve">Approve</DropdownItem>
                      <DropdownItem key="reject">Reject</DropdownItem>
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

export default APIKeyApprovalsPage;
