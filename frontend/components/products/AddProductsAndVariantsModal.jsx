import React, { useEffect, useState } from "react";
import {
    Modal,
} from "@shopify/polaris";
import { SaveMinor } from "@shopify/polaris-icons";
import ProductsAndVariantsSelection from "./ProductsAndVariantsSelection.jsx";
import { useProductResourcePicker } from '../hooks/useProductResourcePicker.js';
import { api } from '../api.js';
import { useToast } from "@shopify/app-bridge-react";
import { ProgressBar } from '@shopify/polaris';

export default function AddProductsAndVariantsModal({ trials, selectedResources, toggleAddProductsAndVariantsModal, handleProductsAndVariantsUpdate, clearSelection }) {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // new loading state
    const toast = useToast();  // use toast
    const [progress, setProgress] = useState(0);

    const {
        pickerOpen,
        handlePickerClose,
        handleSelectionChange,
    } = useProductResourcePicker(false, (updatedSelection) => {
        setSelectedProducts(updatedSelection.products.map(product => product.id));
        setSelectedVariants(updatedSelection.variants.map(variant => variant.id));
    });

    useEffect(() => {
        const selectedTrials = trials.filter(trial => selectedResources.includes(trial.id));
        const productIdsFromSelectedTrials = selectedTrials.flatMap(trial => trial.productIds);
        const variantIdsFromSelectedTrials = selectedTrials.flatMap(trial => trial.productVariantsIds);

        setSelectedProducts(prev => Array.from(new Set([...prev, ...productIdsFromSelectedTrials])));
        setSelectedVariants(prev => Array.from(new Set([...prev, ...variantIdsFromSelectedTrials])));
    }, [trials, selectedResources]);

    const updateProductsAndVariants = async () => {
        setIsLoading(true);  // set loading state
        let errors = [];
        let responses = [];  // array to store all responses
        let resourceIds = [];  // array to store all resource IDs

        for (let i = 0; i < selectedResources.length; i++) {

            const resourceId = selectedResources[i];
            const updateTrialInput = {
                productIds: selectedProducts,
                productVariantsIds: selectedVariants,
            };

            console.log(updateTrialInput);
            try {
                let response = await api.trial.updateProductsAndVariants(resourceId, updateTrialInput);
                if (response?.error) {
                    errors.push(resourceId);  // collect errors
                } else {
                    responses.push(response);  // collect successful responses
                    resourceIds.push(resourceId);  // collect successfully updated resource IDs
                    setProgress(((i + 1) / selectedResources.length) * 100);
                }
            } catch (error) {
                console.error(error);
                errors.push(resourceId);
            }
        }

        handleProductsAndVariantsUpdate(responses, resourceIds);  // update trials in TrialsIndexTable with all responses and resource IDs
        setIsLoading(false);  // clear loading state
        clearSelection();

        if (errors.length > 0) {
            toast.show(`Update failed.`);
            // toast.show(`Failed to update trial(s) with ID(s): ${errors.join(', ')}`);
        } else {
            // toast.show(`Products successfully updated for all selected trials`);
            toast.show(`Update succeeded.`);

        }

        setSelectedProducts([]);
        setSelectedVariants([]);
        toggleAddProductsAndVariantsModal();
    }

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={open}
                onClose={toggleAddProductsAndVariantsModal}
                title="Add products and variants"
                primaryAction={{
                    content: 'Save',
                    icon: SaveMinor,
                    onAction: updateProductsAndVariants,
                    disabled: isLoading,
                    loading: isLoading
                }}
                large
            >
                <Modal.Section>
                    {isLoading && (
                        <>
                            <ProgressBar progress={progress} />
                            <br />
                        </>
                    )}
                    <ProductsAndVariantsSelection
                        callToAction='Associate products and variants to selected trial plan(s).'
                        isPickerOpen={true}
                        onChange={handleSelectionChange}
                    />
                </Modal.Section>
            </Modal>
        </div>

    );
}
