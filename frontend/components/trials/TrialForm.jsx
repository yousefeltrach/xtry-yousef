import { Page, Layout, PageActions, Card, Badge, Text, List, Banner, BlockStack, InlineStack, Box } from "@shopify/polaris";
import { SaveMinor, CancelMinor, DeleteMinor, StatusActiveMajor, DraftOrdersMajor } from '@shopify/polaris-icons';
import { useNavigate, useToast } from "@shopify/app-bridge-react";
import { useForm, useField } from "@shopify/react-form";
import { getAllTrials } from "../../data/getAllTrials.js";

import TrialNameTextField from "./TrialNameTextField.jsx";
import TrialOptionDraggableItems from "./TrialOptionDraggableItems.jsx";
import FulfillmentSelection from "./FulfillmentSelection.jsx";
import InventoryReserve from "./InventoryReserve.jsx";
import PlanTitleTextField from "./PlanTitleTextField.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import ProductsAndVariantsSelection from "./ProductsAndVariantsSelection.jsx";


import { api } from '../../api.js';

import { useState, useEffect, useRef } from "react";
import { useFindFirst } from "@gadgetinc/react";

export default function TrialForm({ initTrialPlanInput }) {

    // console.log(initTrialPlanInput);
    const navigate = useNavigate();
    const toast = useToast();

    const [trialPlanInput, setTrialPlanInput] = useState(initTrialPlanInput);
    const [trialPlanNames, setTrialPlanNames] = useState([]);
    const [trialPlanTitles, setTrialPlanTitles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Get the current shop.
    const [{ data: shopData, fetching: shopFetching, error: shopFetchError }] = useFindFirst(api.shopifyShop, {
        select: {
            id: true,
        },
    });

    console.log(shopData);


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

    //#region purchase option form 

    // let data = null;
    const {
        fields: {
            spgName,
            planTitle,
            isPublished,
            spOptions,
            category,
            sellingPlanGroupId,
            fulfillmentTrigger,
            inventoryReserve,
            resources,
        },
        submit,
        submitting,
        dirty,
    } = useForm({
        fields: {
            spgName: useField(trialPlanInput.input.name),
            planTitle: useField(trialPlanInput.input.planTitle),
            isPublished: useField(trialPlanInput.input.isPublished),
            spOptions: useField(trialPlanInput.input.options),
            category: useField(trialPlanInput.input.category),
            sellingPlanGroupId: useField(trialPlanInput.input.sellingPlanGroupId),
            fulfillmentTrigger: useField(trialPlanInput.input.fulfillmentTrigger),
            inventoryReserve: useField(trialPlanInput.input.inventoryReserve),
            resources: useField({
                products: trialPlanInput.resources.products,
                variants: trialPlanInput.resources.variants,
            }),
        },
        onSubmit: async (form) => {
            setErrorMessage(null);

            let response;
            // const products = form.resources.products.map((product) => product);
            // const variants = form.resources.variants.map((variant) => variant);
            const productIds = form.resources.products.map((product) => product.id);
            const variantIds = form.resources.variants.map((variant) => variant.id);

            // Prepare the trial plan options:
            const trialPlanOptions = form.spOptions.map(option => {
                return {
                    create: {
                        adjustmentValue: option.adjustmentAmount,
                        checkoutChargeValue: option.depositAmount,
                        hasDeposit: option.setDeposit,
                        hasDiscount: option.setDiscount,
                        isPopular: option.isPopular,
                        name: option.optionName,
                        position: option.position,
                        remainingBalanceChargeTrigger: option.depositAmount === 100 ? "NO_REMAINING_BALANCE" : "TIME_AFTER_CHECKOUT",
                        remainingBalanceChargeTimeAfterCheckout: "P" + option.chargeRemainingBalanceDaysAfterCheckout + "D",
                        remainingBalanceDaysAfterCheckout: option.chargeRemainingBalanceDaysAfterCheckout,
                        shop: { _link: shopData.id },
                        trialPeriod: option.trialPeriodNumberOfDays,
                        trialPeriodStartTime: option.trialPeriodStartTime,
                        expectedDeliveryTime: option.expectedDeliveryTimeInDays
                    }
                };
            });

            // Assuming form.resources.products is an array of products
            const trialProducts = form.resources.products.map(product => {
                // Extract the Shopify product ID from the product ID string
                // Example: "gid://shopify/Product/8623769583904" -> "8623769583904"
                const shopifyProductId = product.id.split('/').pop();

                return {
                    create: {
                        shopifyProductId: product.id,
                        product: {
                            _link: shopifyProductId
                        },
                        shop: {
                            _link: shopData.id,
                        }
                    }
                };
            });

            // Assuming form.resources.products is an array of products
            const trialProductVariants = form.resources.variants.map(variant => {
                // Extract the Shopify product variant ID from the product ID string
                // Example: "gid://shopify/ProductVariant/8623769583904" -> "8623769583904"
                const shopifyProductVariantId = variant.id.split('/').pop();

                return {
                    create: {
                        shopifyProductVariantId: variant.id,
                        productVariant: {
                            _link: shopifyProductVariantId
                        },
                        shop: {
                            _link: shopData.id,
                        }
                    }
                };
            });

            try {
                if (form.sellingPlanGroupId) {

                    console.log("update state.");

                    response = await api.trialPlan.update(
                        String(trialPlanInput.input.id),
                        {
                            sellingPlanGroupId: form.sellingPlanGroupId,
                            name: form.spgName,
                            planTitle: form.planTitle,
                            inventoryPolicy: form.inventoryReserve,
                            deliveryPolicy: form.fulfillmentTrigger,
                            productVariantsIds: variantIds,
                            productIds: productIds,
                            options: form.spOptions,
                        });

                } else {

                    console.log("create state.");

                    response = await api.trialPlan.create({
                        sellingPlanGroupId: form.sellingPlanGroupId,
                        name: form.spgName,
                        planTitle: form.spgName,
                        isPublished: form.isPublished,
                        options: form.spOptions,
                        inventoryPolicy: form.inventoryReserve,
                        deliveryPolicy: form.fulfillmentTrigger,
                        shop: {
                            _link: shopData.id,
                        },
                        trialPlanOptions: trialPlanOptions,
                        trialProducts: trialProducts,
                        trialProductVariants: trialProductVariants,
                    });
                }

                console.log({ "response": response });

                if (response?.error) {
                    setErrorMessage(`Failed to ${form.sellingPlanGroupId ? 'update' : 'create'} trial plan: ${form.spgName}.`);
                    toast.show(`Failed to ${form.sellingPlanGroupId ? 'update' : 'create'} trial plan.`);
                } else {
                    toast.show(`Trial plan successfully ${form.sellingPlanGroupId ? 'updated' : 'created'}.`);
                    // if(!form.sellingPlanGroupId){
                    navigate("/trials");
                    // }
                }

            } catch (err) {
                console.log(response);
                setErrorMessage(`Failed to ${form.sellingPlanGroupId ? 'update' : 'create'} trial plan: ${form.spgName}.`);
                toast.show(`Failed to ${form.sellingPlanGroupId ? 'update' : 'create'} trial plan.`);
            }
        },
    });

    //#region form validation - disable or enable save button
    const initialSpgName = useRef(spgName.value);
    const initialPlanTitles = useRef(planTitle.value);

    useEffect(() => {
        (async () => {
            const { trialPlanNames, planTitles } = await getAllTrials();

            const filteredTrialPlanNames = trialPlanNames.filter(name => name !== initialSpgName.current);
            const filteredPlanTitles = planTitles.filter(title => title !== initialPlanTitles.current);

            setTrialPlanNames(filteredTrialPlanNames);
            setTrialPlanTitles(filteredPlanTitles);

            const isNameOrTitleDuplicate = filteredTrialPlanNames.includes(spgName.value.trim())
                || filteredPlanTitles.includes(planTitle.value.trim());
            const areOptionsFilled = spOptions.value.length > 0;
            const areProductsAndVariantsFilled = resources.value.products.length > 0
                && resources.value.variants.length > 0;

            setIsSaveButtonDisabled(isNameOrTitleDuplicate || !areOptionsFilled || !areProductsAndVariantsFilled);
        })();
    }, [spgName.value, planTitle.value, spOptions.value, resources.value.products, resources.value.variants]);

    //#endregion

    // const productIds = resources.value.products.map((product) => product.id);
    // const variantIds = resources.value.variants.map((variant) => variant.id);

    // console.log(productIds);
    // console.log(variantIds);

    console.log(resources.value.products);
    console.log(resources.value.variants);

    let secondaryActionsListForPage = [];
    let secondaryActionsListForPageActions = [];
    const discardButton = {
        content: "Discard",
        icon: CancelMinor,
        disabled: !dirty,
        onAction: () => {
            navigate("/trials");
        },
    };

    if (sellingPlanGroupId.value !== null) {
        // For an update, only show the delete button
        secondaryActionsListForPageActions.push({
            content: "Delete",
            icon: DeleteMinor,
            destructive: true,
            onAction: () => {
                setShowDeleteModal(true);  // This will show the modal
            },
        });
        secondaryActionsListForPageActions.push(discardButton);
        secondaryActionsListForPage.push(discardButton);
    } else {
        // For creation, show the discard button
        secondaryActionsListForPageActions.push(discardButton);
        secondaryActionsListForPage.push(discardButton);

    }

    //#endregion

    return (
        <>
            <Page
                fullWidth
                backAction={{ onAction: () => navigate('/trials') }}
                title="Trial plan"
                primaryAction={
                    {
                        content: "Save",
                        icon: SaveMinor,
                        onAction: submit,
                        disabled: !(dirty && !isSaveButtonDisabled),
                        loading: submitting,
                    }
                }
                secondaryActions={secondaryActionsListForPage}
            // pagination={{
            //     hasPrevious: true,
            //     hasNext: true,
            // }}
            >
                <form onSubmit={submit}>
                    <Layout>
                        <Layout.Section>
                            {errorMessage && (
                                <>
                                    <Banner
                                        title="There was an issue saving this trial plan."
                                        tone="critical"
                                        onDismiss={() => setErrorMessage(null)}
                                    >
                                        <Text fontWeight="medium" tone="critical" as="p" variant="bodyMd">{errorMessage}</Text>
                                    </Banner>
                                    <br />
                                </>
                            )}
                            <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                                <Card>
                                    <PlanTitleTextField
                                        placeholder={planTitle.value}
                                        planTitle={planTitle.value}
                                        onChange={planTitle.onChange}
                                        trialPlanTitles={trialPlanTitles}
                                    />
                                </Card>
                                <Card>
                                    <TrialNameTextField
                                        placeholder={spgName.value}
                                        purchaseOptionName={spgName.value}
                                        onChange={spgName.onChange}
                                        trialPlanNames={trialPlanNames}
                                    />
                                </Card>

                                <ProductsAndVariantsSelection
                                    isPickerOpen={false}
                                    onChange={resources.onChange}
                                    products={resources.value.products}
                                    variants={resources.value.variants}
                                />

                                <TrialOptionDraggableItems
                                    spOptions={spOptions.value}
                                    onChange={spOptions.onChange}
                                />

                                <FulfillmentSelection
                                    category={category.value}
                                    fulfillmentTrigger={fulfillmentTrigger.value}
                                    fulfillmentDate={null}
                                    onFulfillmentDateChange={null}
                                    onTypeChange={fulfillmentTrigger.onChange}
                                />
                                <InventoryReserve
                                    inventoryReservation={inventoryReserve.value}
                                    onChange={inventoryReserve.onChange}
                                />
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
                                        <InlineStack align="start" blockAlign="stretch" gap={200}>
                                            <BlockStack inlineAlign="start">
                                                <Text as="h1" variant="headingLg" alignment="start" fontWeight="bold">
                                                    Trial plan
                                                </Text>
                                            </BlockStack>
                                            <BlockStack inlineAlign="start" align="space-evenly">
                                                <Badge tone="info-strong">{spgName.value}</Badge>
                                            </BlockStack>
                                            <BlockStack inlineAlign="end" align="space-evenly">
                                                {isPublished.value ?
                                                    <Badge tone="success" icon={StatusActiveMajor}>Active</Badge>
                                                    :
                                                    <Badge tone="enabled" icon={DraftOrdersMajor}>Draft</Badge>
                                                }
                                            </BlockStack>
                                        </InlineStack>
                                        <Card background="bg-surface-secondary">
                                            <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                                                <Text as="h3" variant="headingMd" alignment="start" fontWeight="medium">
                                                    Options
                                                </Text>
                                                <List type="number" spacing="loose">
                                                    {spOptions.value.map(option => (
                                                        <List.Item key={option.id} value={`spOptions-${option.id}`}>
                                                            <Text variant="bodyMd">{option.optionName}</Text>
                                                        </List.Item>
                                                    ))}
                                                </List>
                                            </BlockStack>
                                        </Card>

                                        <Card background="bg-surface-secondary">
                                            <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                                                <Text as="h3" variant="headingMd" alignment="start" fontWeight="medium">
                                                    Balance
                                                </Text>
                                                <List type="number" spacing="loose">
                                                    {spOptions.value.map(option => (
                                                        option.depositAmount !== 100 ? (
                                                            <List.Item key={option.id} value={`balance-${option.id}`}>
                                                                <Text variant="bodyMd">
                                                                    <Badge tone="info">{100 - parseInt(option.depositAmount)}%</Badge> remaining balance.
                                                                </Text>
                                                                <Text variant="bodySm">
                                                                    Collect remaining balance {' '}
                                                                    <Badge tone="info">{option.chargeRemainingBalanceDaysAfterCheckout}</Badge> {' '}
                                                                    days after checkout.
                                                                </Text>
                                                            </List.Item>

                                                        ) : (
                                                            <List.Item key={option.id} value={`balance-${option.id}`}>
                                                                <Text variant="bodyMd">
                                                                    No remaining balance.
                                                                </Text>
                                                            </List.Item>
                                                        )
                                                    ))}
                                                </List>
                                            </BlockStack>
                                        </Card>
                                        <Card background="bg-surface-secondary">
                                            <BlockStack align="space-evenly" inlineAlign="stretch" gap={300}>
                                                <Text as="h3" variant="headingMd" alignment="start" fontWeight="medium">
                                                    Delivery
                                                </Text>
                                                <List type="bullet">
                                                    <List.Item value="fulfillment">
                                                        <Text variant="bodyMd">Fulfillment set to {" "}
                                                            <Badge tone="info">{fulfillmentTrigger.value}</Badge>
                                                        </Text>
                                                    </List.Item>
                                                    <List.Item value="inventory">
                                                        <Text variant="bodyMd">Inventory set to {" "}
                                                            <Badge tone="info">{inventoryReserve.value}</Badge>
                                                        </Text>
                                                    </List.Item>
                                                </List>
                                            </BlockStack>
                                        </Card>
                                    </BlockStack>
                                </Card>

                            </Layout.Section>
                        </div>
                    </Layout>
                </form>
                <Layout>
                    <Layout.Section>
                        <PageActions
                            primaryAction={{
                                content: "Save",
                                icon: SaveMinor,
                                onAction: submit,
                                disabled: !(dirty && !isSaveButtonDisabled),
                                loading: submitting,
                            }}
                            secondaryActions={secondaryActionsListForPageActions}
                        />
                    </Layout.Section>
                </Layout>
            </Page>

            {showDeleteModal && (
                <DeleteConfirmation
                    trialPlanInput={trialPlanInput}
                    onClose={(errorMsg) => {
                        if (errorMsg) {
                            setErrorMessage(errorMsg);
                        }
                        setShowDeleteModal(false);
                    }}
                    onDeleteSuccess={() => {
                        navigate("/trials"); // Navigate after a successful deletion
                    }}
                />
            )}
        </>
    );
}
