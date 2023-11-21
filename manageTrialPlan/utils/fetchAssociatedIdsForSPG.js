import { FETCH_ASSOCIATED_PRODUCT_VARIANTS_IDS_QUERY } from "../common/gqlqueries";

async function fetchAssociatedIdsForSPG(storeId, sellingPlanGroupID, connections, logger) {
    let response;
    let spgId = 'gid://shopify/SellingPlanGroup/' + sellingPlanGroupID;

    try {
        response = await connections.shopify.current?.graphql(FETCH_ASSOCIATED_PRODUCT_VARIANTS_IDS_QUERY, {
            id: spgId
        });
        logger.debug({response}, 
            `[Store: ${storeId}] Response from Shopify fetching products and product variants for the selling plan group ${spgId}`);
        if (!response || !response.sellingPlanGroup) {
            throw new Error("Unexpected response from Shopify API when fetching associated IDs.");
        }

        const productIds = response.sellingPlanGroup.products.edges.map(edge => edge.node.id);
        const productVariantIds = response.sellingPlanGroup.productVariants.edges.map(edge => edge.node.id);

        logger.debug({productIds}, 
            `Store: ${storeId}] Fetched product Ids from selling plan group ${spgId}`);
        logger.debug({productVariantIds}, 
            `Store: ${storeId}] Fetched product variants Ids from selling plan group ${spgId}`);
        
        return {
            productIds,
            productVariantIds
        };

    } catch (error) {
        logger.error({ error }, "Error fetching associated product and variant IDs from Shopify.");
        throw error;
    }
}

export default fetchAssociatedIdsForSPG;
