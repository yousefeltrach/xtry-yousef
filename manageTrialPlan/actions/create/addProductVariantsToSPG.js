import { ADD_PRODUCT_VARIANTS_TO_SPG_MUTATION } from '../../common/gqlqueries';

async function addProductVariantsToSPG(sellingPlanGroupID, newProductVariantsIds, connections, logger) {
    // If there are no new product variants, simply return
    if (!Array.isArray(newProductVariantsIds) || newProductVariantsIds.length === 0) {
        return null;
    }
    

    let response;
    let spgId = 'gid://shopify/SellingPlanGroup/' + sellingPlanGroupID;

    try {
        response = await connections.shopify.current?.graphql(ADD_PRODUCT_VARIANTS_TO_SPG_MUTATION, {
            id: spgId,
            productVariantIds: newProductVariantsIds
        });

        logger.debug({ 
            "Shopify response": response, 
            "Product variants Ids": newProductVariantsIds 
        }, `Shopify response after the add query of product(s).`);

        if (!response || !response.sellingPlanGroupAddProductVariants) {
            throw new Error("Unexpected response from Shopify API.");
        }

        const { userErrors, sellingPlanGroup } = response.sellingPlanGroupAddProductVariants;

        if (userErrors && userErrors.length > 0) {
            throw new Error("Failed to add product variants to the selling plan group.");
        }

        return sellingPlanGroup;

    } catch (error) {
        throw error;
    }
}

export default addProductVariantsToSPG;
