async function removeTrialProductVariants(api, productVariantsIds, trialRecord, logger) {
    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: Removing trial product variants linked to trial : ${trialRecord.id}.`);

    try {
        for (let productVariantIdLink of productVariantsIds) {
            const idNumber = productVariantIdLink.split('/').pop();

            // Fetch trialProductVariants for the given productVariantId and trialId to get their IDs
            const existingTrialProductVariants = await api.trialProductVariant.findMany({
                filter: {
                    AND: [
                        { productVariant: { in: [idNumber] } },
                        { trial: { in: [trialRecord.id] } }
                    ]
                }
            });

            if (existingTrialProductVariants && existingTrialProductVariants.length > 0) {
                for (let trialProductVariant of existingTrialProductVariants) {
                    const deleteResult = await api.trialProductVariant.delete(trialProductVariant.id);
                    
                    if (deleteResult && deleteResult.errors && deleteResult.errors.length > 0) {
                        logger.error({ deleteResult }, `[StoreId: ${trialRecord.shop}]: Failed to delete trial product variant ${trialProductVariant.id} linked to trial model : ${trialRecord.id}.`);
                        throw new Error(deleteResult.errors.join(", "));
                    } else {
                        logger.info({ deleteResult }, `[StoreId: ${trialRecord.shop}]: Trial product variant ${trialProductVariant.id} removed successfully from trial model : ${trialRecord.id}.`);
                    }
                }
            } else {
                logger.warn({ productVariantIdLink }, `[StoreId: ${trialRecord.shop}]: Trial product variant for product variant ID ${idNumber} not found for trial model : ${trialRecord.id}. Skipping removal.`);
            }
        }
    } catch (error) {
        logger.error(`[StoreId: ${trialRecord.shop}]: Failed to remove trial product variant linked to trial model : ${trialRecord.id}.`, error);
        throw error;
    }
}

export default removeTrialProductVariants;