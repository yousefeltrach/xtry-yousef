async function createTrialProductVariants(api, productVariantIds, trialRecord, logger) {
    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: Create and link trial product variant to trial : ${trialRecord.id}.`);

    // If there are no new product variants, simply return
    if (productVariantIds.length === 0) {
        return null;
    }
    
    try {
        for (let productVariantIdLink of productVariantIds) {
            const idNumber = productVariantIdLink.split('/').pop();

            const existingTrialProductVariants = await api.trialProductVariant.findMany({
                filter: {
                    AND: [
                        { productVariant: { in: [idNumber] } },
                        { trial: { in: [trialRecord.id] } }
                    ]
                }
            });

            if (existingTrialProductVariants && existingTrialProductVariants.length > 0) {
                logger.warn({ existingTrialProductVariants },
                 `[StoreId: ${trialRecord.shop}]: Trial product variant for product variant ID ${idNumber} already exists and is linked to trial model : ${trialRecord.id}. Skipping.`);
                continue;
            }

            const trialProductVariantRecord = await api.trialProductVariant.create({
                productVariant: {
                    _link: idNumber
                },
                trial: {
                    _link: trialRecord.id
                },
                shop: {
                    _link: trialRecord.shop
                }
            });

            // const trialProductVariantRecord = await api.trialProductVariant.create(
            //     {
            //         trialProductVariant: {
            //             productVariant: {
            //                 _link: idNumber
            //             },
            //             trial: {
            //                 _link: trialRecord.id
            //             },
            //             shop: {
            //                 _link: trialRecord.shop
            //             }

            //         }
            //     }
            // );

            if (trialProductVariantRecord?.error) {
                logger.error({ trialProductVariantRecord }, 
                    `[StoreId: ${trialRecord.shop}]: Failed to create trial product variant and link it to trial model : ${trialRecord.id}.`);
                throw new Error(trialProductVariantRecord.error);
            } else {
                logger.info({ trialProductVariantRecord }, 
                    `[StoreId: ${trialRecord.shop}]: Trial product variant created and linked successfully to trial model : ${trialRecord.id}.`);
            }
        }
    } catch (error) {
        logger.error(`[StoreId: ${trialRecord.shop}]: Failed to create trial product variant and link it to trial model : ${trialRecord.id}.`, error);
        throw error;
    }
}

export default createTrialProductVariants;
