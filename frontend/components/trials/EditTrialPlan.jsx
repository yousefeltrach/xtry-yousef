import { useFindMany, useFindOne } from "@gadgetinc/react";
import { useParams } from 'react-router-dom';

import { api } from '../../api.js';
import TrialFormLoadingState from './TrialFormLoadingState.jsx';
import TrialForm from './TrialForm.jsx';
import TrialPlanFetchningError from "./TrialPlanFetchingError.jsx";

export default function EditTrialPlan() {

    const { id } = useParams();

    console.log("id:" + id);

    let mappedData = null;

    const [{ data, fetching, error }] = useFindOne(api.trialPlan, `${id}`, {
        select: {
            id: true,
            name: true,
            planTitle: true,
            options: true,
            deliveryPolicy: true,
            inventoryPolicy: true,
            sellingPlanGroupId: true,
            trialPlanOptions: {
                edges: {
                    node: {
                        id: true,
                        sellingPlanId: true,
                        name: true,
                        hasDeposit: true,
                        checkoutChargeValue: true,
                        hasDiscount: true,
                        isPopular: true,
                        adjustmentValue: true,
                        trialPeriod: true,
                        trialPeriodStartTime: true,
                        expectedDeliveryTime: true,
                        remainingBalanceDaysAfterCheckout: true,
                        position: true,
                    }
                }
            },
            trialProducts: {
                edges: {
                    node: {
                        productId: true,
                        shopifyProductId: true,
                        product: {
                            id: true,
                            images: {
                                edges: {
                                    node: {
                                        source: true,
                                    }
                                }
                            },
                            title: true,
                        }
                    }
                }
            },
            trialProductVariants: {
                edges: {
                    node: {
                        id: true,
                        productVariantId: true,
                        shopifyProductVariantId: true,
                        productVariant: {
                            inventoryQuantity: true,
                            price: true,
                            id: true,
                            productId: true,
                            title: true,
                        }
                    }
                }
            }
        }
    });

    console.log(data);

    if (data) {

        const variants = data.trialProductVariants.edges.map(edge => {
            const variantNode = edge.node.productVariant;
            return {
                id: `gid://shopify/ProductVariant/${variantNode.id}`,
                inventoryQuantity: variantNode.inventoryQuantity,
                price: variantNode.price,
                title: variantNode.title,
                productId: `gid://shopify/Product/${variantNode.productId}`,
            };
        });

        const products = data.trialProducts.edges.map(edge => {
            const productNode = edge.node.product;
            const productVariants = variants.filter(variant => variant.productId === `gid://shopify/Product/${productNode.id}`);

            return {
                id: `gid://shopify/Product/${productNode.id}`,
                images: productNode.images.edges.map(imageEdge => ({ source: imageEdge.node.source })),
                title: productNode.title,
                variants: productVariants
            };
        });

        mappedData = {
            input: {
                id: data.id,
                name: data.name,
                planTitle: data.planTitle,
                isPublished: data.isPublished,
                category: "TRY_BEFORE_YOU_BUY",
                sellingPlanGroupId: data.sellingPlanGroupId,
                options: data.trialPlanOptions.edges.map(edge => ({
                    id: edge.node.id,
                    sellingPlanId: edge.node.sellingPlanId,
                    optionName: edge.node.name,
                    setDeposit: edge.node.hasDeposit,
                    depositAmount: edge.node.checkoutChargeValue,
                    setDiscount: edge.node.hasDiscount,
                    isPopular: edge.node.isPopular,
                    adjustmentAmount: edge.node.adjustmentValue,
                    trialPeriodNumberOfDays: edge.node.trialPeriod,
                    trialPeriodStartTime: edge.node.trialPeriodStartTime,
                    expectedDeliveryTimeInDays: edge.node.expectedDeliveryTime,
                    chargeRemainingBalanceDaysAfterCheckout: edge.node.remainingBalanceDaysAfterCheckout,
                    position: edge.node.position,
                })),
                fulfillmentTrigger: data.deliveryPolicy,
                inventoryReserve: data.inventoryPolicy,
            },
            resources: {
                products: products,
                variants: variants,
            },
        };
    }
    console.log(mappedData);

    if (error) {
        return <TrialPlanFetchningError />
    }
    // console.log(data);
    return (
        <>
            {fetching ? (
                <TrialFormLoadingState />
            ) : (
                mappedData && <TrialForm initTrialPlanInput={mappedData} />
            )}
        </>
    );
}
