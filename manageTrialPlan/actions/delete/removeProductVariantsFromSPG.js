import { REMOVE_PRODUCTS_VARIANTS_FROM_SPG_MUTATION } from '../../common/gqlqueries';

async function removeProductVariantsFromSPG(connections, productVariantsIds, sellingPlanGroupID, logger) {

    if(productVariantsIds.length === 0 ){
        return null;
    }

    const spgId = 'gid://shopify/SellingPlanGroup/' + sellingPlanGroupID;

    let response;

    try {
        response = await connections.shopify.current?.graphql(REMOVE_PRODUCTS_VARIANTS_FROM_SPG_MUTATION, {
            id: spgId,
            productVariantIds: productVariantsIds
        });

        logger.debug({ response }, `Shopify response after delete query of product variants ${productVariantsIds}`);

        if (!response || !response.sellingPlanGroupRemoveProductVariants) {
            throw new Error("Unexpected response from Shopify API.");
        }

        const { userErrors } = response.sellingPlanGroupRemoveProductVariants;

        if (userErrors && userErrors.length > 0) {
            throw new Error("Failed to remove product variants from the selling plan group.");
        }

        return response.sellingPlanGroupRemoveProductVariants;

    } catch (error) {
        throw error;
    }
}

export default removeProductVariantsFromSPG;
