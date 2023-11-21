import { useState, useCallback } from "react";

export function useProductResourcePicker(
    initialPickerState = false,
    onChangeCallback,
    initialSelectedProducts = [],
    initialAllVariants = [],
) {

    // console.log(initialSelectedProducts);
    // console.log(initialAllVariants);

    const [pickerOpen, setPickerOpen] = useState(initialPickerState);
    const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);
    const [allVariants, setAllVariants] = useState(initialAllVariants);

    const handlePickerClose = () => {
        setPickerOpen(false);
    };

    const handleSelectionChange = (updatedSelection) => {
        setPickerOpen(false);
        setSelectedProducts(updatedSelection.products);
        setAllVariants(updatedSelection.variants);
        onChangeCallback(updatedSelection);
    };

    const handleRemoveProduct = useCallback((productId) => {
        const updatedProducts = selectedProducts.filter((product) => product.id !== productId);
        const updatedVariants = allVariants.filter((variant) => variant.productId !== productId);

        setSelectedProducts(updatedProducts);
        setAllVariants(updatedVariants);
        onChangeCallback({ products: updatedProducts, variants: updatedVariants });
    }, [selectedProducts, allVariants, onChangeCallback]);

    const handleRemoveVariant = useCallback((productId, variantId) => {
        const productIndex = selectedProducts.findIndex((product) => product.id === productId);
        if (productIndex === -1) return;

        const updatedProduct = { ...selectedProducts[productIndex] };
        updatedProduct.variants = updatedProduct.variants.filter((variant) => variant.id !== variantId);
        const updatedProducts = [...selectedProducts];
        updatedProducts[productIndex] = updatedProduct;

        setSelectedProducts(updatedProducts);
        setAllVariants(allVariants.filter((variant) => variant.id !== variantId));
        onChangeCallback({ products: updatedProducts, variants: allVariants.filter((variant) => variant.id !== variantId) });
    }, [selectedProducts, allVariants, onChangeCallback]);

    return {
        pickerOpen,
        setPickerOpen,
        selectedProducts,
        allVariants,
        handlePickerClose,
        handleSelectionChange,
        handleRemoveProduct,
        handleRemoveVariant,
    };
}
