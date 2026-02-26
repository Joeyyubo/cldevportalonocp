import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Flex,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Icon
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
  CodeBranchIcon
} from '@patternfly/react-icons';

const LIFECYCLES = ['Production', 'Development', 'Staging', 'Deprecated', 'Beta'];
const VERSIONS = ['v1.0.0', 'v2.1.3', 'v1.5.0', 'v3.0.0-beta', 'v2.0.1', 'v1.2.0', 'v2.3.0', 'v1.8.0', 'v2.0.0', 'v1.1.0'];
const API_NAMES = [
  'Order Service',
  'User Authentication',
  'Payment Gateway',
  'Product Catalog',
  'Inventory Management',
  'Notification Service',
  'Analytics Events',
  'Customer Profile',
  'Shipping & Fulfillment',
  'Billing & Invoicing'
];

const apiData = API_NAMES.map((name, i) => ({
  id: `api-${i}`,
  name,
  lifecycle: LIFECYCLES[i % LIFECYCLES.length],
  version: VERSIONS[i % VERSIONS.length]
}));

const PortalPage = ({ onApiNameClick, onBack }) => {
  const [lifecycleDropdownOpen, setLifecycleDropdownOpen] = useState(false);

  return (
    <>
      <PageSection variant="light">
        {onBack && (
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <BreadcrumbItem
              onClick={onBack}
              isLink
              style={{ color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Portals
            </BreadcrumbItem>
            <BreadcrumbItem isActive>Internal portal</BreadcrumbItem>
          </Breadcrumb>
        )}
        <Title headingLevel="h1" size="2xl">Internal portal</Title>
        <p style={{ marginTop: '8px', color: 'var(--pf-v5-global--Color--200)' }}>
          View the organization internal available APIs.
        </p>
      </PageSection>

      <PageSection>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <Dropdown
                  isOpen={lifecycleDropdownOpen}
                  onOpenChange={(open) => setLifecycleDropdownOpen(open)}
                  onSelect={() => setLifecycleDropdownOpen(false)}
                  toggle={(toggleRef) => (
                    <MenuToggle
                      ref={toggleRef}
                      onClick={() => setLifecycleDropdownOpen((prev) => !prev)}
                      isExpanded={lifecycleDropdownOpen}
                      variant="default"
                    >
                      <Icon style={{ marginRight: '8px' }}>
                        <FilterIcon />
                      </Icon>
                      Lifecycle
                    </MenuToggle>
                  )}
                >
                  <DropdownList>
                    {LIFECYCLES.map((l) => (
                      <DropdownItem key={l}>{l}</DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              </Flex>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>

        <Table aria-label="Portal APIs table">
          <Thead>
            <Tr>
              <Th>API name</Th>
              <Th>Lifecycle</Th>
              <Th>Version</Th>
            </Tr>
          </Thead>
          <Tbody>
            {apiData.map((row) => (
              <Tr key={row.id}>
                <Td>
                  <Button
                    variant="link"
                    isInline
                    onClick={() => onApiNameClick && onApiNameClick(row.name)}
                  >
                    {row.name}
                  </Button>
                </Td>
                <Td>{row.lifecycle}</Td>
                <Td>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapXs' }}>
                    <Icon>
                      <CodeBranchIcon style={{ fontSize: '14px', color: 'var(--pf-v5-global--Color--200)' }} />
                    </Icon>
                    <span>{row.version}</span>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </>
  );
};

export default PortalPage;
