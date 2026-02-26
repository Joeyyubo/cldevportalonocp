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
  TextArea,
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
import {
  PlusIcon
} from '@patternfly/react-icons';

const MCPServerTemplatePage = ({ onBack, onCancel }) => {
  // Template connection state
  const [templateForm, setTemplateForm] = useState({
    serverName: '',
    serverType: 'kubernetes',
    namespace: 'default',
    endpoint: '',
    description: '',
    enableTLS: false,
    certificatePath: '',
    keyPath: '',
    labels: [{ key: '', value: '' }],
    annotations: [{ key: '', value: '' }]
  });

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Helper functions for labels and annotations
  const addLabelOrAnnotation = (type) => {
    if (type === 'labels') {
      setTemplateForm({
        ...templateForm,
        labels: [...templateForm.labels, { key: '', value: '' }]
      });
    } else {
      setTemplateForm({
        ...templateForm,
        annotations: [...templateForm.annotations, { key: '', value: '' }]
      });
    }
  };

  const removeLabelOrAnnotation = (type, index) => {
    if (type === 'labels') {
      const updatedLabels = templateForm.labels.filter((_, i) => i !== index);
      setTemplateForm({ ...templateForm, labels: updatedLabels });
    } else {
      const updatedAnnotations = templateForm.annotations.filter((_, i) => i !== index);
      setTemplateForm({ ...templateForm, annotations: updatedAnnotations });
    }
  };

  const updateLabelOrAnnotation = (type, index, field, value) => {
    if (type === 'labels') {
      const updated = [...templateForm.labels];
      updated[index][field] = value;
      setTemplateForm({ ...templateForm, labels: updated });
    } else {
      const updated = [...templateForm.annotations];
      updated[index][field] = value;
      setTemplateForm({ ...templateForm, annotations: updated });
    }
  };

  const validateTemplateForm = () => {
    const errors = {};
    
    if (!templateForm.serverName.trim()) {
      errors.serverName = 'Server name is required';
    } else if (!/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(templateForm.serverName)) {
      errors.serverName = 'Server name must be a valid DNS-1123 label';
    }

    if (!templateForm.endpoint.trim()) {
      errors.endpoint = 'Endpoint is required';
    }

    if (templateForm.enableTLS) {
      if (!templateForm.certificatePath.trim()) {
        errors.certificatePath = 'Certificate path is required when TLS is enabled';
      }
      if (!templateForm.keyPath.trim()) {
        errors.keyPath = 'Key path is required when TLS is enabled';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTemplateSubmit = (event) => {
    event.preventDefault();
    
    if (!validateTemplateForm()) {
      setShowAlert(true);
      return;
    }

    console.log('Template form submitted:', templateForm);
    alert('MCP Server connected successfully via template!');
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
          <BreadcrumbItem>Connect via Template</BreadcrumbItem>
        </Breadcrumb>
        
        <Title headingLevel="h1" size="2xl" style={{ marginTop: '16px' }}>
          Connect MCP Server via Template
        </Title>
      </PageSection>
      
      <PageSection>
        {showAlert && (
          <Alert
            variant="danger"
            title="Validation Error"
            style={{ marginBottom: '24px' }}
            actionClose={<Button variant="plain" onClick={() => setShowAlert(false)} />}
          >
            Please fix the validation errors before proceeding.
          </Alert>
        )}

        <Form onSubmit={handleTemplateSubmit}>
          <Grid hasGutter>
            {/* Basic Information */}
            <GridItem span={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Title headingLevel="h2" size="lg">
                      Basic Information
                    </Title>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Server Name" isRequired fieldId="server-name">
                        <TextInput
                          isRequired
                          type="text"
                          id="server-name"
                          name="server-name"
                          value={templateForm.serverName}
                          onChange={(_event, value) => setTemplateForm({ ...templateForm, serverName: value })}
                          validated={validationErrors.serverName ? 'error' : 'default'}
                        />
                        <FormHelperText>
                          <HelperText>
                            <HelperTextItem>
                              Must be a valid DNS-1123 label (lowercase alphanumeric characters or '-')
                            </HelperTextItem>
                          </HelperText>
                        </FormHelperText>
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Server Type" isRequired fieldId="server-type">
                        <select
                          id="server-type"
                          value={templateForm.serverType}
                          onChange={(e) => setTemplateForm({ ...templateForm, serverType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d2d2d2',
                            borderRadius: '4px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="kubernetes">Kubernetes</option>
                          <option value="openshift">OpenShift</option>
                          <option value="vmware">VMware</option>
                          <option value="aws">AWS</option>
                          <option value="azure">Azure</option>
                          <option value="gcp">Google Cloud</option>
                          <option value="custom">Custom</option>
                        </select>
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Namespace" isRequired fieldId="namespace">
                        <TextInput
                          isRequired
                          type="text"
                          id="namespace"
                          name="namespace"
                          value={templateForm.namespace}
                          onChange={(_event, value) => setTemplateForm({ ...templateForm, namespace: value })}
                        />
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Endpoint" isRequired fieldId="endpoint">
                        <TextInput
                          isRequired
                          type="text"
                          id="endpoint"
                          name="endpoint"
                          value={templateForm.endpoint}
                          onChange={(_event, value) => setTemplateForm({ ...templateForm, endpoint: value })}
                          placeholder="https://mcp-server.example.com:8443"
                          validated={validationErrors.endpoint ? 'error' : 'default'}
                        />
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem span={12}>
                      <FormGroup label="Description" fieldId="description">
                        <TextArea
                          id="description"
                          name="description"
                          value={templateForm.description}
                          onChange={(_event, value) => setTemplateForm({ ...templateForm, description: value })}
                          placeholder="Optional description for this MCP server"
                          rows={3}
                        />
                      </FormGroup>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>

            {/* Security Configuration */}
            <GridItem span={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Title headingLevel="h2" size="lg">
                      Security Configuration
                    </Title>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem span={12}>
                      <Checkbox
                        id="enable-tls"
                        label="Enable TLS"
                        isChecked={templateForm.enableTLS}
                        onChange={(_event, checked) => setTemplateForm({ ...templateForm, enableTLS: checked })}
                        description="Enable TLS encryption for the connection"
                      />
                    </GridItem>
                    
                    {templateForm.enableTLS && (
                      <>
                        <GridItem xl={6} lg={6} md={12}>
                          <FormGroup label="Certificate Path" isRequired fieldId="certificate-path">
                            <TextInput
                              isRequired
                              type="text"
                              id="certificate-path"
                              name="certificate-path"
                              value={templateForm.certificatePath}
                              onChange={(_event, value) => setTemplateForm({ ...templateForm, certificatePath: value })}
                              placeholder="/path/to/certificate.crt"
                              validated={validationErrors.certificatePath ? 'error' : 'default'}
                            />
                          </FormGroup>
                        </GridItem>
                        
                        <GridItem xl={6} lg={6} md={12}>
                          <FormGroup label="Private Key Path" isRequired fieldId="key-path">
                            <TextInput
                              isRequired
                              type="text"
                              id="key-path"
                              name="key-path"
                              value={templateForm.keyPath}
                              onChange={(_event, value) => setTemplateForm({ ...templateForm, keyPath: value })}
                              placeholder="/path/to/private.key"
                              validated={validationErrors.keyPath ? 'error' : 'default'}
                            />
                          </FormGroup>
                        </GridItem>
                      </>
                    )}
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>

            {/* Labels and Annotations */}
            <GridItem span={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Title headingLevel="h2" size="lg">
                      Labels and Annotations
                    </Title>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Labels" fieldId="labels">
                        {templateForm.labels.map((label, index) => (
                          <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'end' }}>
                            <div style={{ flex: 1 }}>
                              <TextInput
                                placeholder="Key"
                                value={label.key}
                                onChange={(_event, value) => updateLabelOrAnnotation('labels', index, 'key', value)}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <TextInput
                                placeholder="Value"
                                value={label.value}
                                onChange={(_event, value) => updateLabelOrAnnotation('labels', index, 'value', value)}
                              />
                            </div>
                            <Button
                              variant="plain"
                              icon={<PlusIcon />}
                              onClick={() => removeLabelOrAnnotation('labels', index)}
                              isDisabled={templateForm.labels.length === 1}
                            />
                          </div>
                        ))}
                        <Button
                          variant="link"
                          icon={<PlusIcon />}
                          onClick={() => addLabelOrAnnotation('labels')}
                        >
                          Add Label
                        </Button>
                      </FormGroup>
                    </GridItem>
                    
                    <GridItem xl={6} lg={6} md={12}>
                      <FormGroup label="Annotations" fieldId="annotations">
                        {templateForm.annotations.map((annotation, index) => (
                          <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'end' }}>
                            <div style={{ flex: 1 }}>
                              <TextInput
                                placeholder="Key"
                                value={annotation.key}
                                onChange={(_event, value) => updateLabelOrAnnotation('annotations', index, 'key', value)}
                              />
                            </div>
                            <div style={{ flex: 1 }}>
                              <TextInput
                                placeholder="Value"
                                value={annotation.value}
                                onChange={(_event, value) => updateLabelOrAnnotation('annotations', index, 'value', value)}
                              />
                            </div>
                            <Button
                              variant="plain"
                              icon={<PlusIcon />}
                              onClick={() => removeLabelOrAnnotation('annotations', index)}
                              isDisabled={templateForm.annotations.length === 1}
                            />
                          </div>
                        ))}
                        <Button
                          variant="link"
                          icon={<PlusIcon />}
                          onClick={() => addLabelOrAnnotation('annotations')}
                        >
                          Add Annotation
                        </Button>
                      </FormGroup>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          <Divider style={{ margin: '32px 0' }} />

          <ActionGroup>
            <Button variant="primary" type="submit">
              Connect Server
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

export default MCPServerTemplatePage;
