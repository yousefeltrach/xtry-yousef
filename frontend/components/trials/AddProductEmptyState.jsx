import { Card, Text, EmptyState, BlockStack } from "@shopify/polaris";
import { AddProductMajor, CirclePlusMajor } from "@shopify/polaris-icons";

export default function AddProductEmptyState({ setPickerOpen }) {
    return (
        <EmptyState
            heading="Connect Products to Trial Plan"
            action={{
                content: 'Add products',
                icon: AddProductMajor,
                onAction: setPickerOpen
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
                    Enhance your trial plan by linking it with products.
                </Text>
                <Text as="span" alignment="center" fontWeight="regular" variant="bodySm" tone="subdued">
                    These links will be visible on each product's page, offering your customers tailored trial options.
                </Text>
            </BlockStack>
        </EmptyState>
    );
}
