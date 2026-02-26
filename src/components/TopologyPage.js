import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Flex,
  FlexItem,
  Label,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Icon
} from '@patternfly/react-core';
import {
  NetworkIcon,
  UsersIcon,
  AngleDownIcon
} from '@patternfly/react-icons';

const TopologyPage = () => {
  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false);
  
  const filters = [
    { name: 'AuthPolicy', removable: true },
    { name: 'Authorino', removable: true },
    { name: 'ConfigMap', removable: true },
    { name: '10 more', removable: true }
  ];

  const removeFilter = (filterName) => {
    // Handle filter removal
    console.log('Remove filter:', filterName);
  };

  const resetFilters = () => {
    // Handle reset filters
    console.log('Reset all filters');
  };

  // SVG Topology Diagram Component
  const TopologyDiagram = () => (
    <div style={{ 
      width: '100%', 
      height: '600px', 
      backgroundColor: '#f5f5f5',
      border: '1px solid #d2d2d2',
      borderRadius: '4px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1200 600">
        {/* Background */}
        <rect width="1200" height="600" fill="#f8f8f8" />
        
        {/* Top Gateway Node */}
        <g transform="translate(150, 50)">
          <rect x="0" y="0" width="200" height="40" rx="20" fill="#0066cc" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            kserve/kserve-ingress-gateway
          </text>
        </g>
        
        {/* Listener Nodes */}
        {[0, 1, 2, 3].map((index) => (
          <g key={index} transform={`translate(${50 + index * 280}, 180)`}>
            {/* Listener Box */}
            <rect x="0" y="0" width="150" height="80" rx="8" fill="white" stroke="#d2d2d2" strokeWidth="1" />
            
            {/* Network Icon */}
            <circle cx="30" cy="40" r="15" fill="#6a6e73" />
            <text x="30" y="45" textAnchor="middle" fill="white" fontSize="10">⚏</text>
            
            {/* Listener Text */}
            <text x="75" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">Listener</text>
            
            {/* Blue Label */}
            <rect x="20" y="55" width="15" height="15" rx="7" fill="#0066cc" />
            <text x="27" y="65" textAnchor="middle" fill="white" fontSize="8">L</text>
            <text x="45" y="65" fontSize="10">
              {index === 0 ? 've-ingress-gateway#https-granite' :
               index === 1 ? 'kserve/kserve-ingress-gateway#https-lim' :
               index === 2 ? 'kserve/kserve-ingress-gateway#https-gwer' :
               'kserve/kserve-ingress-gateway#https-wildcard'}
            </text>
          </g>
        ))}
        
        {/* HTTPRoute Nodes */}
        <g transform="translate(400, 450)">
          {/* Left HTTPRoute */}
          <rect x="0" y="0" width="120" height="60" rx="8" fill="white" stroke="#d2d2d2" strokeWidth="1" />
          <circle cx="30" cy="30" r="12" fill="#6a6e73" />
          <text x="30" y="35" textAnchor="middle" fill="white" fontSize="8">👥</text>
          <text x="60" y="20" fontSize="10" fontWeight="bold">HTTPRoute</text>
          <rect x="50" y="35" width="35" height="15" rx="7" fill="#0066cc" />
          <text x="67" y="44" textAnchor="middle" fill="white" fontSize="8">HTTP</text>
          <text x="60" y="55" fontSize="8">default/huggingface-qwen3</text>
        </g>
        
        <g transform="translate(700, 450)">
          {/* Right HTTPRoute */}
          <rect x="0" y="0" width="120" height="60" rx="8" fill="white" stroke="#d2d2d2" strokeWidth="1" />
          <circle cx="30" cy="30" r="12" fill="#6a6e73" />
          <text x="30" y="35" textAnchor="middle" fill="white" fontSize="8">👥</text>
          <text x="60" y="20" fontSize="10" fontWeight="bold">HTTPRoute</text>
          <rect x="50" y="35" width="35" height="15" rx="7" fill="#0066cc" />
          <text x="67" y="44" textAnchor="middle" fill="white" fontSize="8">HTTP</text>
          <text x="60" y="55" fontSize="8">default/huggingface-qr</text>
        </g>
        
        {/* Connection Lines */}
        {/* From gateway to listeners */}
        <line x1="250" y1="90" x2="125" y2="180" stroke="#999" strokeWidth="1" />
        <line x1="250" y1="90" x2="405" y2="180" stroke="#999" strokeWidth="1" />
        <line x1="250" y1="90" x2="685" y2="180" stroke="#999" strokeWidth="1" />
        <line x1="250" y1="90" x2="965" y2="180" stroke="#999" strokeWidth="1" />
        
        {/* From listeners to HTTPRoutes */}
        {/* Multiple connections showing the network topology */}
        <line x1="125" y1="260" x2="430" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="405" y1="260" x2="430" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="685" y1="260" x2="430" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="965" y1="260" x2="430" y2="450" stroke="#999" strokeWidth="1" />
        
        <line x1="125" y1="260" x2="760" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="405" y1="260" x2="760" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="685" y1="260" x2="760" y2="450" stroke="#999" strokeWidth="1" />
        <line x1="965" y1="260" x2="760" y2="450" stroke="#999" strokeWidth="1" />
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
          </marker>
        </defs>
        
        {/* Add arrows to some lines */}
        <line x1="460" y1="510" x2="460" y2="550" stroke="#999" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="760" y1="510" x2="760" y2="550" stroke="#999" strokeWidth="1" markerEnd="url(#arrowhead)" />
      </svg>
    </div>
  );

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">
          Topology View
        </Title>
        <p style={{ marginTop: '16px', color: '#6a6e73', fontSize: '14px', lineHeight: '1.5' }}>
          This view visualizes the relationships and interactions between different resources within your cluster related to Kuadrant, allowing you to explore connections between Gateways, HTTPRoutes and Kuadrant Policies.
        </p>
      </PageSection>
      
      <PageSection>
        <div style={{ marginBottom: '24px' }}>
          <Toolbar>
            <ToolbarContent>
              <ToolbarItem>
                <Dropdown
                  onSelect={() => setIsResourceDropdownOpen(false)}
                  toggle={
                    <MenuToggle
                      onClick={() => setIsResourceDropdownOpen(!isResourceDropdownOpen)}
                      isExpanded={isResourceDropdownOpen}
                    >
                      Resource 13 <AngleDownIcon />
                    </MenuToggle>
                  }
                  isOpen={isResourceDropdownOpen}
                >
                  <DropdownList>
                    <DropdownItem key="all">All Resources (13)</DropdownItem>
                    <DropdownItem key="gateways">Gateways (2)</DropdownItem>
                    <DropdownItem key="httproutes">HTTPRoutes (4)</DropdownItem>
                    <DropdownItem key="policies">Policies (7)</DropdownItem>
                  </DropdownList>
                </Dropdown>
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
        </div>
        
        <div style={{ marginBottom: '24px' }}>
          <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <span style={{ fontSize: '14px', fontWeight: 'bold', marginRight: '8px' }}>Resource</span>
            </FlexItem>
            {filters.map((filter, index) => (
              <FlexItem key={index}>
                <Label 
                  color="blue" 
                  variant="filled" 
                  isCompact
                  onClose={filter.removable ? () => removeFilter(filter.name) : undefined}
                >
                  {filter.name}
                </Label>
              </FlexItem>
            ))}
            <FlexItem>
              <Button variant="link" onClick={resetFilters}>
                Reset Filters
              </Button>
            </FlexItem>
          </Flex>
        </div>
        
        <TopologyDiagram />
      </PageSection>
    </>
  );
};

export default TopologyPage; 