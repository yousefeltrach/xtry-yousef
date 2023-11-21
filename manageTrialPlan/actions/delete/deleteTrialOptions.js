async function deleteTrialOptions(api, trialOptions, trialRecord, logger) {
    // Early exit if no trialOptions are provided.
    if (!trialOptions || trialOptions.length === 0) {
        logger.warn({ trialRecord }, `[StoreId: ${trialRecord.shop}]: No trial options provided.`);
        return;
    }

    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: Delete trial options from trial model : ${trialRecord.id}`);
    let response;

    try {
        for (let option of trialOptions) {
            const { sellingPlanId } = option.id;

            const existingTrialOption = await api.trialOption.findBySellingPlanId(sellingPlanId);
            logger.debug({ existingTrialOption }, `Existing trial option related to selling plan Id: ${sellingPlanId}`);

            if (!existingTrialOption) {
                logger.warn({ sellingPlanId }, `[StoreId: ${trialRecord.shop}]: No trial option found for sellingPlanId ${sellingPlanId}. Skipping deletion.`);
                continue;
            }
            response = await api.trialOption.delete(existingTrialOption.id);

            if (response?.error) {
                logger.error({ response }, `[StoreId: ${trialRecord.shop}]: Failed to delete trial option from trial model : ${trialRecord.id}.`);
                throw new Error(response.error);
            } else {
                logger.info({ response }, `[StoreId: ${trialRecord.shop}]: Trial option deleted successfully from trial model : ${trialRecord.id}.`);
            }

            logger.info({ response }, `[StoreId: ${trialRecord.shop}]: Delete trial option response after making changes on trial model : ${trialRecord.id}.`);
        }
    } catch (error) {
        logger.error({ error }, `[StoreId: ${trialRecord.shop}]: Failed to delete trial option from trial model : ${trialRecord.id}.`);
        throw error;
    }
}

export default deleteTrialOptions;
