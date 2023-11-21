import React, { useState, useCallback } from 'react';
import { Page, BlockStack, Tabs, InlineStack, Divider, Text, InlineGrid, TextField, Box, Layout, Card, useBreakpoints } from '@shopify/polaris';
import Connect from '../components/Settings/Connect';

const TabContent = ({ tabId }) => {
  switch (tabId) {
    case 'all-settings':
      return <div>All settings content</div>;
    case 'account-connection':
      return <Connect />;
    case 'general':
      return <div>General settings content</div>;
    case 'payments':
      return <div>Payment settings content</div>;
    // Add more cases for additional tabs
    default:
      return null;
  }
};

export default function Settings() {
  const { smUp } = useBreakpoints();
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

  const tabs = [
    {
      id: 'all-settings',
      content: 'All Settings',
      panelID: 'all-settings-panel',
    },
    {
      id: 'account-connection',
      content: 'Account connection',
      panelID: 'connection-panel',
    },
    {
      id: 'general',
      content: 'General',
      panelID: 'general-panel',
    },
    {
      id: 'payments',
      content: 'Payments',
      panelID: 'payments-panel',
    },
    // Add more tabs as needed
  ];

  return (
    <Page title='Settings'>

      <BlockStack gap={{ xs: "800", sm: "400" }} >
        <BlockStack >

          <Card roundedAbove="md" background="bg-surface-secondary">
            <div style={{ marginLeft: '-30px' }}>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} > </Tabs>
            </div>
         
          <br />

          <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">

            <Box
              as="section"
              paddingInlineStart={{ xs: 400, sm: 0 }}
              paddingInlineEnd={{ xs: 400, sm: 0 }}
            >
              <BlockStack gap="400" >
                <Text variant="headingSm" as="h6">{tabs[selected].content}</Text>
                <Text as="p" variant="bodyMd">
                  description
                </Text>
              </BlockStack>
            </Box>
 
            <div roundedAbove="sm">
              <BlockStack gap="400">
                <TabContent tabId={tabs[selected].id} />
              </BlockStack>
            </div>
          </InlineGrid>
</Card>

        </BlockStack>

        {smUp ? <Divider /> : null}
        {/* <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                description
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid> */}
      </BlockStack>

    </Page>
  );
}

