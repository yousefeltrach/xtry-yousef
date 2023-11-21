import { useNavigate } from '@shopify/app-bridge-react';
import {
  Layout,
  Card,
  SkeletonBodyText,
  Text,
  Badge,
  List,
  Page,
  PageActions,
  SkeletonDisplayText,
  BlockStack,
  InlineStack,
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import { SaveMinor, CancelMinor, DeleteMinor } from '@shopify/polaris-icons';


export default function TrialFormLoadingState() {

  const navigate = useNavigate();

  //#region mobile size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once on mount to set the initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //#endregion

  return (

    <Page
      fullWidth
      backAction={{ onAction: () => navigate('/trials') }}
      title="Trial plan"
      primaryAction={
        {
          content: "Save",
          icon: SaveMinor,
          disabled: true,
        }
      }
      secondaryActions={[
        {
          content: "Discard",
          icon: CancelMinor,
          onAction: () => {
            navigate("/trials");
          },
          disabled: true,
        },
      ]}
    // pagination={{
    //     hasPrevious: false,
    //     hasNext: false,
    // }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
            <Card>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={3}/>
                </BlockStack>
            </Card>
            <Card>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={3}/>
                </BlockStack>
            </Card>
            <Card>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={3}/>
                </BlockStack>
            </Card>
            <Card>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={3}/>
                </BlockStack>
            </Card>
            <Card>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={3}/>
                </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
        <div style={
          {
            position: 'sticky',
            top: 20, zIndex: 1,
            width: isMobile ? "100%" : "35%"
          }
        }>
          <Layout.Section secondary>
            <Card background="bg-surface-secondary">
              <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                    <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={1}/>
                  </BlockStack>
                <Card background="bg-surface-secondary">
                  <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                    <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={2}/>
                  </BlockStack>
                </Card>

                <Card background="bg-surface-secondary">
                  <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={2}/>
                  </BlockStack>
                </Card>
                <Card background="bg-surface-secondary">
                  <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                  <SkeletonDisplayText size='medium'/>
                    <SkeletonBodyText lines={2}/>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>

          </Layout.Section>
        </div>
      </Layout>
      <Layout>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: "Save",
              icon: SaveMinor,
              disabled: true,
            }}
            secondaryActions={[
              {
                content: "Delete",
                icon: DeleteMinor,
                destructive: true,
                disabled: true,
              },
              {
                content: "Discard",
                icon: CancelMinor,
                onAction: () => {
                  navigate("/trials");
                },
                disabled: true,
              },
            ]}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
