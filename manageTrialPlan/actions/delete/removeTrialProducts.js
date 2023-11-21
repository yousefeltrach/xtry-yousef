async function removeTrialProducts(api, productIds, trialRecord, logger) {
    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: We remove trial products linked to trial : ${trialRecord.id}.`);

    try {
        for (let productIdLink of productIds) {
            const idNumber = productIdLink.split('/').pop();

            // Fetch trialProducts for the given productId and trialId to get their IDs
            const existingTrialProducts = await api.trialProduct.findMany({
                filter: {
                    AND: [
                        { product: { in: [idNumber] } },
                        { trial: { in: [trialRecord.id] } }
                    ]
                }
            });

            if (existingTrialProducts && existingTrialProducts.length > 0) {
                for (let trialProduct of existingTrialProducts) {
                    const deleteResult = await api.trialProduct.delete(trialProduct.id);
                    
                    if (deleteResult && deleteResult.errors && deleteResult.errors.length > 0) {
                        logger.error({ deleteResult }, `[StoreId: ${trialRecord.shop}]: Failed to delete trial product ${trialProduct.id} linked to trial model : ${trialRecord.id}.`);
                        throw new Error(deleteResult.errors.join(", "));
                    } else {
                        logger.info({ deleteResult }, `[StoreId: ${trialRecord.shop}]: Trial product ${trialProduct.id} removed successfully from trial model : ${trialRecord.id}.`);
                    }
                }
            } else {
                logger.warn({ productIdLink }, `[StoreId: ${trialRecord.shop}]: Trial product for product ID ${idNumber} not found for trial model : ${trialRecord.id}. Skipping removal.`);
            }
        }
    } catch (error) {
        logger.error(`[StoreId: ${trialRecord.shop}]: Failed to remove trial product linked to trial model : ${trialRecord.id}.`, error);
        throw error;
    }
}

export default removeTrialProducts;
