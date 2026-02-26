import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
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
  FileUpload,
  Spinner
} from '@patternfly/react-core';

const MCPServerConfigPage = ({ onBack, onCancel }) => {
  // Config file upload state
  const [configFile, setConfigFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleConfigFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setConfigFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleConfigFileSubmit = (event) => {
    event.preventDefault();
    
    if (!configFile) {
      return;
    }

    console.log('Config file submitted:', configFile);
    alert('MCP Server connected successfully via config file!');
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
          <BreadcrumbItem>Connect via Config File</BreadcrumbItem>
        </Breadcrumb>
        
        <Title headingLevel="h1" size="2xl" style={{ marginTop: '16px' }}>
          Connect MCP Server via Config File
        </Title>
      </PageSection>
      
      <PageSection>
        <Form onSubmit={handleConfigFileSubmit}>
          <Grid hasGutter>
            <GridItem span={12}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Title headingLevel="h2" size="lg">
                      Upload Configuration File
                    </Title>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Grid hasGutter>
                    <GridItem span={12}>
                      <Alert 
                        variant="info" 
                        isInline 
                        title="Supported file formats"
                        style={{ marginBottom: '24px' }}
                      >
                        Upload JSON or YAML configuration files containing MCP Server information.
                        The file should include server details, endpoints, and security configurations.
                      </Alert>
                    </GridItem>
                    
                    <GridItem span={12}>
                      <FormGroup label="Configuration File" isRequired fieldId="config-file">
                        <FileUpload
                          id="config-file"
                          type="text"
                          value={configFile ? configFile.name : ''}
                          filename={configFile ? configFile.name : ''}
                          onChange={handleConfigFileUpload}
                          accept=".json,.yaml,.yml"
                          browseButtonText="Browse"
                          placeholder="Drag and drop a file here, or click to browse"
                          dropzoneProps={{
                            accept: {
                              'application/json': ['.json'],
                              'text/yaml': ['.yaml', '.yml']
                            }
                          }}
                        />
                        <FormHelperText>
                          <HelperText>
                            <HelperTextItem>
                              Supported formats: JSON, YAML (.yaml, .yml)
                            </HelperTextItem>
                          </HelperText>
                        </FormHelperText>
                      </FormGroup>
                    </GridItem>
                    
                    {isUploading && (
                      <GridItem span={12}>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <Spinner size="lg" />
                          <div style={{ marginTop: '16px' }}>
                            Uploading... {uploadProgress}%
                          </div>
                        </div>
                      </GridItem>
                    )}
                    
                    {configFile && !isUploading && (
                      <GridItem span={12}>
                        <Alert 
                          variant="success" 
                          isInline 
                          title="File ready for upload"
                        >
                          File "{configFile.name}" ({Math.round(configFile.size / 1024)} KB) is ready to be processed.
                        </Alert>
                      </GridItem>
                    )}
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          <Divider style={{ margin: '32px 0' }} />

          <ActionGroup>
            <Button variant="primary" type="submit" isDisabled={!configFile || isUploading}>
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

export default MCPServerConfigPage;
