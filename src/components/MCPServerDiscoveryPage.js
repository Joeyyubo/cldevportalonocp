import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  TextInput,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Alert,
  ActionGroup,
  Divider,
  HelperText,
  HelperTextItem,
  FormHelperText,
  Checkbox
} from '@patternfly/react-core';

const MCPServerDiscoveryPage = ({ onBack, onCancel }) => {
  // Auto discovery state
  const [discoveryForm, setDiscoveryForm] = useState({
    discoveryMethod: 'kubernetes',
    namespace: 'default',
    labelSelector: '',
    serviceAccount: '',
    clusterRole: '',
    autoApprove: false
  });

  const handleDiscoverySubmit = (event) => {
    event.preventDefault();
    
    if (!discoveryForm.discoveryMethod) {
      return;
    }

    console.log('Discovery form submitted:', discoveryForm);
    alert('MCP Server connected successfully via auto discovery!');
    onBack();
  };

  return (
    <>
      <PageSection variant="light">
        <Breadcrumb>
          <BreadcrumbItem>
            <Button variant="link" onClick={onBack}>
              MCP Servers
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button variant="link" onClick={onBack}>
              Connect MCP Server
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>Connect via Discovery</BreadcrumbItem>
        </Breadcrumb>
        
        <Title headingLevel="h1" size="2xl" style={{ marginTop: '16px' }}>
          Connect MCP Server via Auto Discovery
        </Title>
      </PageSection>
      
      <PageSection>
        <Form onSubmit={handleDiscoverySubmit}>
          <Grid hasGutter>
            <GridItem span={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Title headingLevel="h2" size="lg">
                      Auto Discovery Configuration
                    </Title>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem span={12}>
                      <Alert 
                        variant="info" 
                        isInline 
                        title="Automatic MCP Server Discovery"
                        style={{ marginBottom: '24px' }}
                      >
                        Configure automatic discovery and registration of MCP Servers in your cluster.
                        This will scan for available servers and register them automatically.
                      </Alert>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Discovery Method" isRequired fieldId="discovery-method">
                        <select
                          id="discovery-method"
                          value={discoveryForm.discoveryMethod}
                          onChange={(e) => setDiscoveryForm({ ...discoveryForm, discoveryMethod: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d2d2d2',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="kubernetes">Kubernetes Service Discovery</option>
                          <option value="endpoints">Endpoint Slices</option>
                          <option value="labels">Label-based Discovery</option>
                          <option value="annotations">Annotation-based Discovery</option>
                          <option value="custom">Custom Discovery Plugin</option>
                        </select>
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Namespace" isRequired fieldId="discovery-namespace">
                        <TextInput
                          isRequired
                          type="text"
                          id="discovery-namespace"
                          name="discovery-namespace"
                          value={discoveryForm.namespace}
                          onChange={(_event, value) => setDiscoveryForm({ ...discoveryForm, namespace: value })}
                        />
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem span={12}>
                      <FormGroup label="Label Selector" fieldId="label-selector">
                        <TextInput
                          type="text"
                          id="label-selector"
                          name="label-selector"
                          value={discoveryForm.labelSelector}
                          onChange={(_event, value) => setDiscoveryForm({ ...discoveryForm, labelSelector: value })}
                          placeholder="app=mcp-server,version=v1"
                        />
                        <FormHelperText>
                          <HelperText>
                            <HelperTextItem>
                              Optional label selector to filter discovered servers (e.g., app=mcp-server)
                            </HelperTextItem>
                          </HelperText>
                        </FormHelperText>
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Service Account" fieldId="service-account">
                        <TextInput
                          type="text"
                          id="service-account"
                          name="service-account"
                          value={discoveryForm.serviceAccount}
                          onChange={(_event, value) => setDiscoveryForm({ ...discoveryForm, serviceAccount: value })}
                          placeholder="mcp-discovery-sa"
                        />
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Cluster Role" fieldId="cluster-role">
                        <TextInput
                          type="text"
                          id="cluster-role"
                          name="cluster-role"
                          value={discoveryForm.clusterRole}
                          onChange={(_event, value) => setDiscoveryForm({ ...discoveryForm, clusterRole: value })}
                          placeholder="mcp-discovery-role"
                        />
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem span={12}>
                      <Checkbox
                        id="auto-approve"
                        label="Auto-approve discovered servers"
                        isChecked={discoveryForm.autoApprove}
                        onChange={(_event, checked) => setDiscoveryForm({ ...discoveryForm, autoApprove: checked })}
                        description="Automatically approve and register discovered MCP servers without manual intervention"
                      />
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          <Divider style={{ margin: '32px 0' }} />

          <ActionGroup>
            <Button variant="primary" type="submit">
              Start Discovery
            </Button>
            <Button variant="secondary" onClick={onBack}>
              Cancel
            </Button>
          </ActionGroup>
        </Form>
      </PageSection>
    </>
  );
};

export default MCPServerDiscoveryPage;
