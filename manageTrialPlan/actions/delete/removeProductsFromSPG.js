import { REMOVE_PRODUCTS_FROM_SPG_MUTATION } from '../../common/gqlqueries';

async function removeProductsFromSPG(connections, productIds, sellingPlanGroupID, logger) {

    if(productIds.length === 0 ){
        return {"productIds": "No products to remove."};
    }

    const spgId = 'gid://shopify/SellingPlanGroup/' + sellingPlanGroupID;
    let response;
    try {
        response = await connections.shopify.current?.graphql(REMOVE_PRODUCTS_FROM_SPG_MUTATION, {
            id: spgId,
            productIds: productIds
        });

        logger.debug({ response }, `Shopify response after delete query of product(s) ${productIds}`);

        if (!response || !response.sellingPlanGroupRemoveProducts) {
            throw new Error("Unexpected response from Shopify API.");
        }

        const { userErrors } = response.sellingPlanGroupRemoveProducts;

        if (userErrors && userErrors.length > 0) {
            throw new Error("Failed to remove products from the selling plan group.");
        }

        return response.sellingPlanGroupRemoveProducts;

    } catch (error) {
        throw error;
    }
}

export default removeProductsFromSPG;
