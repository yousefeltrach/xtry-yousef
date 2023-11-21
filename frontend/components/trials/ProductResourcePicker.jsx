import { useState, useCallback } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

export default function ProductResourcePicker({ open, onCancel, selectedProducts, allVariants, onSelectionChange }) {

    const handleProductsSelection = useCallback((resources) => {

        // Deselected products and variants
        const deselectedProducts = selectedProducts.filter(p => !resources.selection.some(rp => rp.id === p.id));
        const deselectedProductIds = deselectedProducts.map(p => p.id);
    
        // Construct the full set of selected variant IDs from resources
        const allSelectedVariantIds = resources.selection.flatMap(product => product.variants.map(v => v.id));
    
        // Identify the deselected variants by filtering allVariants with IDs not in the set of selected variant IDs
        const deselectedVariants = allVariants.filter(v => !allSelectedVariantIds.includes(v.id));
    
        // Extract new and existing variants from the resources.selection, but this time we won't check if their parent product is in the selection.
        const selectedVariantsFromResources = resources.selection.flatMap(product => product.variants.map(v => ({
            ...v,
            productId: product.id,
            productName: product.title
        })));
    
        // We can construct the final set of products and variants by combining resources and filtering out the deselected ones
        const finalProducts = resources.selection;
        const finalVariants = selectedVariantsFromResources.filter(v => !deselectedVariants.some(dv => dv.id === v.id));
    
        onSelectionChange({
            products: finalProducts,
            variants: finalVariants
        });
    }, [selectedProducts, allVariants, onSelectionChange]);
    
    
    
    return (
        <ResourcePicker
            resourceType="Product"
            showVariants={true}
            open={open}
            actionVerb="select"
            initialSelectionIds={[...selectedProducts]}
            onSelection={(resources) => handleProductsSelection(resources)}
            onCancel={onCancel}
        />
    );
}
