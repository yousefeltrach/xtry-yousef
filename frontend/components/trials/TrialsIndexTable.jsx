import {
    IndexTable,
    useIndexResourceState,
    Text,
    Link,
    Card,
} from '@shopify/polaris';
import { DeleteMinor } from "@shopify/polaris-icons";

import React, { useState } from 'react';

import TrialsEmptyState from "./TrialsEmptyState.jsx";
import { api } from '../../api.js';
import { useNavigate, useToast } from "@shopify/app-bridge-react";
// import AddProductsAndVariantsModal from './AddProductsAndVariantsModal.jsx';


export default function TrialsIndexTable({ trialPlans, isLoading }) {

    const emptyStateMarkup = (
        <TrialsEmptyState />
    );

    const resourceName = {
        singular: 'trial plan',
        plural: 'trial plans',
    };

    const productLabel = {
        singular: 'product',
        plural: 'products',
    };

    const variantLabel = {
        singular: 'variant',
        plural: 'variants',
    };

    const toast = useToast();
    const navigate = useNavigate();
    // const [modalActive, setModalActive] = useState(false);
    // const toggleAddProductsAndVariantsModal = () => setModalActive(!modalActive);

    const {
        selectedResources,
        allResourcesSelected,
        handleSelectionChange,
        clearSelection,
        removeSelectedResources,
    } = useIndexResourceState(trialPlans);

    const getTrialNameById = (id) => {
        // Assuming `trialPlans` is accessible in this scope
        const trial = trialPlans.find(trial => trial.id === id);
        return trial?.trialName; // This will be undefined if no trial with the given ID is found
    }

    // derive selectedTrials state
    const selectedTrials = selectedResources.filter(resourceId =>
        trialPlans.some(trial => trial.id === resourceId)
    );

    const handleProductsAndVariantsUpdate = (responses, resourceIds) => {
        let successCount = 0;
        let failureCount = 0;

        // Use `forEach` to iterate over each response and corresponding resourceId
        responses.forEach((response, index) => {
            const resourceId = resourceIds[index];
            // Update your `trialPlans` data based on the `response` and `resourceId`
            if (response?.success) {
                successCount += 1;
            } else if (response?.error) {
                failureCount += 1;
            }
        });

        // Show a single toast message based on the overall result
        if (failureCount > 0) {
            toast.show(`Successfully updated products and variants for ${successCount} trialPlans, but failed for ${failureCount} trialPlans.`);
        } else {
            toast.show(`Successfully updated products and variants for all ${successCount} trialPlans.`);
        }

        clearSelection();
    }

    const handleBulkDelete = async (resourcesToDelete) => {
        for (let resourceId of resourcesToDelete) {
            let response;
            let trialName = getTrialNameById(resourceId); // This function should be defined by you
            try {
                response = await api.trialPlan.delete(String(resourceId));
                console.log({ "response": response });
                if (response?.error) {
                    setTimeout(() => {
                        toast.show(`Failed to remove ${trialName}.`);
                    }, 1000); // Delay of 1s.
                } else {
                    setTimeout(() => {
                        toast.show(`${trialName} successfully removed.`);
                    }, 1000); // Delay of 1s.
                }
            } catch (error) {
                console.error(response?.error);
                setTimeout(() => {
                    toast.show(`Failed to remove ${trialName}.`);
                }, 1000); // Delay of 1s.
            }
        }
    }

    const promotedBulkActions = [
        {
            content: 'Add products and variants',
            // onAction: toggleAddProductsAndVariantsModal,
        },
    ];

    const bulkActions = [
        {
            content: `Delete ${selectedTrials.length} ${selectedTrials.length > 1 ? resourceName.plural : resourceName.singular}.`,
            destructive: true,
            icon: DeleteMinor,
            onAction: () => {

                console.log('Selected resource IDs:', selectedTrials);
                // implement bulk delete
                handleBulkDelete(selectedTrials);
            },
        },
    ];

    console.log(trialPlans);

    const rowMarkup = trialPlans.map(
        (
            { id, trialPlanName, planTitle, trialPeriodSummary, depositSummary, discountSummary, chargeBalanceSummary, deliveryPolicy, inventoryPolicy, trialProducts },
            index,
        ) => {

            let formattedDeliveryPolicy = deliveryPolicy
                ? deliveryPolicy.replace("_", " ").toLowerCase()
                : 'missing value';
            formattedDeliveryPolicy = formattedDeliveryPolicy.charAt(0).toUpperCase() + formattedDeliveryPolicy.slice(1);

            let formattedInventoryPolicy = inventoryPolicy
                ? inventoryPolicy.replace("_", " ").toLowerCase()
                : 'missing value';
            formattedInventoryPolicy = formattedInventoryPolicy.charAt(0).toUpperCase() + formattedInventoryPolicy.slice(1);

            return (

                <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                >
                    <IndexTable.Cell>
                        <Link
                            dataPrimaryLink
                            onClick={() => navigate(`/trials/${id}`)}
                        >
                            <Text variant="bodyMd" fontWeight="bold" as="span" alignment='start'>
                                {trialPlanName || 'missing value'}
                            </Text>
                        </Link>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Text variant="bodyMd" fontWeight="regular" as="span" alignment='start'>
                            {planTitle || 'missing value'}
                        </Text>
                    </IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{trialPeriodSummary || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{depositSummary || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{discountSummary || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{chargeBalanceSummary || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{formattedDeliveryPolicy || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{formattedInventoryPolicy || 'missing value'}</Text></IndexTable.Cell>
                    <IndexTable.Cell><Text variant='bodyMd' fontWeight='regular' as='p' alignment='center'>{trialProducts?.length || 'missing value'}</Text></IndexTable.Cell>
                </IndexTable.Row>
            )
        },
    );

    return (
        <>

            <IndexTable
                resourceName={resourceName}
                itemCount={trialPlans.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedTrials.length
                }
                onSelectionChange={handleSelectionChange}
                headings={[
                    {
                        title: 'Name',
                        alignment: 'start',
                        tooltipContent: "Visible on product pages linked to this trial."
                    },
                    {
                        title: 'Plan title',
                        alignment: 'start',
                        tooltipContent: "For internal use only, unseen by customers."
                    },
                    {
                        title: 'Trial period',
                        tooltipContent: "Min-max trial period in days offered."
                    },
                    {
                        title: 'Deposit',
                        tooltipContent: "Min-max deposit amount (%) collected at checkout."
                    },
                    {
                        title: 'Discount',
                        tooltipContent: "Min-max discount applied if product is kept."
                    },
                    {
                        title: 'Charge balance date',
                        tooltipContent: "Min-max charge balance day(s) after checkout."
                    },
                    {
                        title: 'Fulfillment',
                        tooltipContent: "ASAP: order is fulfilled immediately. Unknown: to be determined."
                    },
                    {
                        title: 'Inventory',
                        tooltipContent: "Inventory updated at order creation (On sale) or fulfillment."
                    },
                    {
                        title: 'Products',
                        tooltipContent: "Products linked to this trial plan."
                    },

                ]}
                bulkActions={bulkActions}
                promotedBulkActions={promotedBulkActions}
                emptyState={emptyStateMarkup}
                loading={isLoading}
            >
                {rowMarkup}
            </IndexTable>

            {/* {modalActive && (
                console.log(selectedResources),
                <AddProductsAndVariantsModal
                    trialPlans={trialPlans}
                    selectedResources={selectedResources}
                    toggleAddProductsAndVariantsModal={toggleAddProductsAndVariantsModal}
                    handleProductsAndVariantsUpdate={handleProductsAndVariantsUpdate}
                    clearSelection={clearSelection}
                />
            )} */}

        </>
    );
}