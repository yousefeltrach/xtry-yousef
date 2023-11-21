import fetchAssociatedIdsForSPG from "./fetchAssociatedIdsForSPG";

/**
 * Extracts new product and product variant IDs that aren't in the provided record.
 * @param {Object} record - Existing record containing product and product variant IDs.
 * @param {Object} params - New product and product variant IDs to check.
 * @returns {Object} Object containing new product IDs and product variant IDs, 
 *                   as well as differences with Shopify.
 */
async function getProductVariantsIdsToAddToSPG(record, params, connections, logger) {

    const {productIds: existingProductIdsInShopify, productVariantIds: existingProductVariantIdsInShopify} = 
        await fetchAssociatedIdsForSPG(record.shopId, record.sellingPlanGroupId, connections, logger);

    // Get products to add (those that exist in params but not in shopify)
    const productIdsToAdd = params.trial.productIds.filter(
        productId => !existingProductIdsInShopify.includes(productId)
    );
    
    // Get product variants to add (those that exist in params but not in shopify)
    const productVariantIdsToAdd = params.trial.productVariantsIds.filter(
        productVariantId => !existingProductVariantIdsInShopify.includes(productVariantId)
    );
    
    // Get products and variants that are different between Shopify and record
    const diffProductIds = existingProductIdsInShopify.filter(
        productId => !record.productIds.includes(productId)
    );
    const diffProductVariants = existingProductVariantIdsInShopify.filter(
        productVariantId => !record.productVariantsIds.includes(productVariantId)
    );

    return {
        productIdsToAdd: productIdsToAdd || [],
        productVariantIdsToAdd: productVariantIdsToAdd || [],
        diffProductIds: diffProductIds || [],
        diffProductVariants: diffProductVariants || []
    };
}

export default getProductVariantsIdsToAddToSPG;
