import { useCallback } from "react";
import {
    ResourceList,
    ResourceItem,
    Text,
    Thumbnail,
    Card,
    Icon,
    BlockStack,
} from "@shopify/polaris";
import { AddProductMajor, DeleteMinor, InventoryMajor, RemoveProductMajor, CashDollarMajor } from "@shopify/polaris-icons";
import ProductResourcePicker from "./ProductResourcePicker";
import { useProductResourcePicker } from '../hooks/useProductResourcePicker'; 

export default function ProductsAndVariantsSelection({ callToAction, isPickerOpen, onChange, products, variants}) {

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
    
    const removeVariantActionInCard = (variantLength, productId, variantId) => {
        return variantLength > 1
            ? [{ destructive: true, icon: DeleteMinor, onAction: () => handleRemoveVariant(productId, variantId) }]
            : [];
    }

    return (
        <>
            <Card sectioned title="Products and variants" primaryFooterAction={
                {
                    content: 'Add product',
                    icon: AddProductMajor,
                    onAction: () => setPickerOpen(true),
                }
            }>
                <Text variant="bodyLg" as="h2" fontWeight="regular">
                    {callToAction}
                </Text>
                <Card.Section>
                    <ResourceList
                        resourceName={{ singular: "product", plural: "products" }}
                        items={selectedProducts}
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
                                <Text variant="bodyMd" fontWeight="bold" as="h3" alignment="start">
                                    {product?.title}
                                </Text>
                                <br />
                                {product?.variants && product?.variants.map((variant) => (
                                    <LegacyCard
                                        title={variant?.title}
                                        sectioned
                                        key={`${variant?.id}-${variant?.title}`}
                                        actions={removeVariantActionInLegacyCard(product?.variants.length, product?.id, variant?.id)}>
                                    <Card
                                        title={variant?.title}
                                        sectioned
                                        key={`${variant?.id}-${variant?.title}`}
                                        actions={removeVariantActionInCard(product?.variants.length, product?.id, variant?.id)}
                                    >
                                        <BlockStack alignment="trailing" spacing="loose">
                                            <Icon source={CashDollarMajor} color="highlight" />
                                            <Text variant="bodySm" fontWeight="semibold" as="span" alignment="start">
                                                {variant?.price}$
                                            </Text>
                                        </BlockStack>
                                        <BlockStack alignment="trailing" spacing="loose">
                                            <Icon source={InventoryMajor} color="highlight" />
                                            <Text variant="bodySm" fontWeight="semibold" as="span" alignment="start">
                                                {variant?.inventoryQuantity} available.
                                            </Text>
                                        </BlockStack>
                                    </Card>
                                    </LegacyCard>
                                ))}
                            </ResourceItem>
                        )}
                    />

                </Card.Section>

                <ProductResourcePicker
                    open={pickerOpen}
                    onCancel={handlePickerClose}
                    selectedProducts={selectedProducts}
                    allVariants={allVariants}
                    onSelectionChange={handleSelectionChange}
                />
            </Card>
        </>
    );
}
