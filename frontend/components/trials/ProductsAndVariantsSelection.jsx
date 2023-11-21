import { useCallback } from "react";
import {
    ResourceList,
    ResourceItem,
    Text,
    Thumbnail,
    Card,
    Icon,
    BlockStack,
    Button,
    InlineStack,
    Badge,
} from "@shopify/polaris";
import { AddProductMajor, DeleteMinor, InventoryMajor, RemoveProductMajor, CashDollarMajor, CirclePlusMajor, CashDollarMinor } from "@shopify/polaris-icons";
import ProductResourcePicker from "./ProductResourcePicker";
import { useProductResourcePicker } from '../../hooks/useProductResourcePicker';
import AddProductEmptyState from "./AddProductEmptyState";

export default function ProductsAndVariantsSelection({ isPickerOpen, onChange, products, variants }) {

    const {
        pickerOpen,
        selectedProducts,
        allVariants,
        setPickerOpen,
        handlePickerClose,
        handleSelectionChange,
        handleRemoveProduct,
        handleRemoveVariant,
    } = useProductResourcePicker(isPickerOpen, onChange, products, variants);

    // console.log(variants);
    // console.log(products);

    const emptyStateMarkup = (
        <AddProductEmptyState setPickerOpen={() => setPickerOpen(true)} />
    );

    return (
        <>
            {/* sectioned title="Products and variants" primaryFooterAction={
                {
                    content: 'Add product',
                    icon: AddProductMajor,
                    onAction: () => setPickerOpen(true),
                }
            } */}
            <Card>
                <BlockStack gap={100}>
                    <BlockStack align="start">
                        <Text as="h2" fontWeight="bold" variant="headingMd" alignment="start">Products</Text>
                    </BlockStack>
                
                <ResourceList
                    resourceName={{ singular: "product", plural: "products" }}
                    items={selectedProducts}
                    emptyState={emptyStateMarkup}
                    renderItem={(product) => (
                        <ResourceItem
                            key={product.id}
                            id={product.id}
                            media={
                                <Thumbnail
                                    source={
                                        product?.images[0]?.originalSrc || product?.images[0]?.source ||
                                        "https://cdn.shopify.com/s/files/1/0757/9955/files/placeholder-images-product-1_large.png"
                                    }
                                    alt={product?.title}
                                />
                            }
                            accessibilityLabel={`View details for ${product?.title}`}
                            shortcutActions={
                                [
                                    {
                                        content: 'Remove product',
                                        icon: RemoveProductMajor,
                                        plain: true,
                                        destructive: true,
                                        onAction: () => handleRemoveProduct(product.id)
                                    }
                                ]
                            }
                            persistActions
                        >
                            <BlockStack align="start" inlineAlign="start" gap={100}>
                                <Text variant="bodyMd" fontWeight="bold" as="h3" alignment="start">
                                    {product?.title}
                                </Text>
                            </BlockStack>
                            {console.log(selectedProducts)}
                            {product?.variants &&
                                <ResourceList
                                    resourceName={{ singular: "variant", plural: "variants" }}
                                    items={product?.variants}
                                    renderItem={(variant) => (
                                        <ResourceItem
                                            key={`${variant?.id}-${variant?.title}`}
                                            id={`${variant?.id}-${variant?.title}`}
                                            shortcutActions={
                                                [
                                                    {
                                                        content: 'Remove variant',
                                                        icon: RemoveProductMajor,
                                                        plain: true,
                                                        destructive: true,
                                                        onAction: () => handleRemoveVariant(product?.id, variant?.id)
                                                    }
                                                ]
                                            }
                                            persistActions
                                        >
                                            <BlockStack align="start" inlineAlign="start" gap={100}>
                                                <BlockStack align="start" inlineAlign="start" gap={300}>
                                                    <Text as="span" variant="bodySm" fontWeight="medium" alignment="start">
                                                        {variant?.title}
                                                    </Text>
                                                </BlockStack>

                                                <InlineStack blockAlign="start" align="start" gap={300}>
                                                    <Badge icon={CashDollarMajor} tone="info">{variant?.price}</Badge>
                                                    <Badge icon={InventoryMajor} tone="warning">{variant?.inventoryQuantity}</Badge>
                                                </InlineStack>
                                            </BlockStack>

                                        </ResourceItem>
                                    )}
                                >
                                </ResourceList>
                            }
                        </ResourceItem>
                    )}
                />
                {selectedProducts.length > 0 &&
                    <BlockStack inlineAlign="end">
                        <Button icon={AddProductMajor} variant="primary" onClick={() => setPickerOpen(true)}>Add product</Button>
                    </BlockStack>
                }
                </BlockStack>
            </Card>
            <ProductResourcePicker
                open={pickerOpen}
                onCancel={handlePickerClose}
                selectedProducts={selectedProducts}
                allVariants={allVariants}
                onSelectionChange={handleSelectionChange}
            />


        </>
    );
}
