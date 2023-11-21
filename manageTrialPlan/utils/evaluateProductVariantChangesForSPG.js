import fetchAssociatedIdsForSPG from "./fetchAssociatedIdsForSPG";

async function evaluateProductVariantChangesForSPG(api, record, params, connections, logger) {

    const {productIds: existingProductIdsInShopify, productVariantIds: existingProductVariantIdsInShopify} = 
        await fetchAssociatedIdsForSPG(record.shopId, record.sellingPlanGroupId, connections, logger);

    // Get products to add (those that exist in params but not in Shopify)
    const productIdsToAdd = params.trial.productIds.filter(
        productId => !existingProductIdsInShopify.includes(productId)
    );
    
    // Get product variants to add (those that exist in params but not in Shopify)
    const productVariantIdsToAdd = params.trial.productVariantsIds.filter(
        productVariantId => !existingProductVariantIdsInShopify.includes(productVariantId)
    );

    // Initialize these arrays to default empty arrays
    let productIdsToRemove = [];
    let productVariantIdsToRemove = [];

    const trialRecord = await api.trial.findById(record.id);
    
    if(trialRecord){
        // Get products to remove (those that exist in trialRecord but not in params)
        productIdsToRemove = trialRecord.productIds.filter(
            productId => !params.trial.productIds.includes(productId)
        );
    
        // Get product variants to remove (those that exist in trialRecord but not in params)
        productVariantIdsToRemove = trialRecord.productVariantsIds.filter(
            productVariantId => !params.trial.productVariantsIds.includes(productVariantId)
        );
    }
    
    return {
        productIdsToAdd: productIdsToAdd || [],
        productVariantIdsToAdd: productVariantIdsToAdd || [],
        productIdsToRemove: productIdsToRemove || [], 
        productVariantIdsToRemove: productVariantIdsToRemove || []
    };
}

export default evaluateProductVariantChangesForSPG; 
