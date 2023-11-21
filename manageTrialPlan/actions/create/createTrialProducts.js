
async function createTrialProducts(api, productIds, trialRecord, logger) {
    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: We create and link trial products to trial : ${trialRecord.id}.`);

    // If there are no new product, simply return
    if (productIds.length === 0) {
        return null;
    }
    
    try {
        for (let productIdLink of productIds) {
            const idNumber = productIdLink.split('/').pop();

            const existingTrialProducts = await api.trialProduct.findMany({
                filter: {
                    AND: [
                        { product: { in: [idNumber] } },
                        { trial: { in: [trialRecord.id] } }
                    ]
                }
            });

            if (existingTrialProducts && existingTrialProducts.length > 0) {
                logger.warn({ existingTrialProducts }, `[StoreId: ${trialRecord.shop}]: Trial product for product ID ${idNumber} already exists and is linked to trial model : ${trialRecord.id}. Skipping.`);
                continue;
            }

            const trialProductRecord = await api.trialProduct.create({
                product: {
                    _link: idNumber
                },
                trial: {
                    _link: trialRecord.id
                },
                shop: {
                    _link: trialRecord.shop
                }
            });

            if (trialProductRecord?.error) {
                logger.error({ trialProductRecord }, `[StoreId: ${trialRecord.shop}]: Failed to create trial product and link it to trial model : ${trialRecord.id}.`);
                throw new Error(trialProductRecord.error);
            } else {
                logger.info({ trialProductRecord }, `[StoreId: ${trialRecord.shop}]: Trial product created and linked successfully to trial model : ${trialRecord.id}.`);
            }
        }
    } catch (error) {
        logger.error(`[StoreId: ${trialRecord.shop}]: Failed to create trial product and link it to trial model : ${trialRecord.id}.`, error);
        throw error;
    }
}

export default createTrialProducts;
