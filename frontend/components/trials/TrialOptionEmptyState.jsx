import { Card, Text, EmptyState, BlockStack } from "@shopify/polaris";
import { CirclePlusMajor } from "@shopify/polaris-icons";

export default function TrialOptionEmptyState({ toggleModal }) {
    return (
        <EmptyState
            heading="Customize Trial Plan"
            action={{
                content: 'Add option',
                icon: CirclePlusMajor,
                onAction: toggleModal
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            // footerContent={
            //     <Text as="p" alignment="center" fontWeight="medium" variant="bodySm">
            //         These will be displayed on the product pages linked to the plan.
            //     </Text>
            // }
        >
            <BlockStack inlineAlign="center" align="center" gap={100}>
                <Text as="p" alignment="center" fontWeight="bold" variant="bodyMd" tone="success">
                    Offer shoppers customizable trial plans by adding options. 
                </Text>
                <Text as="span" alignment="center" fontWeight="regular" variant="bodySm" tone="subdued">
                    These will be displayed on the product pages linked to the plan.
                </Text>
            </BlockStack>
        </EmptyState>
    );
}
