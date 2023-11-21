import {
    TRY_BEFORE_YOU_BUY,
    PERCENTAGE,
    NO_REMAINING_BALANCE,
    TIME_AFTER_CHECKOUT
} from '../../common/constants';

async function createTrialOptions(api, trialOptions, trialRecord, logger) {

    // Early exit if no trialOptions are provided.
    if (!trialOptions || trialOptions.length === 0) {
        logger.warn({ trialRecord }, `[StoreId: ${trialRecord.shop}]: No trial options provided.`);
        return;
    }

    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: Initiating creation and linking of trial options to trial model : ${trialRecord.id}`);

    for (let option of trialOptions) {
        const {
            optionName,
            trialPeriodNumberOfDays,
            setDeposit,
            setDiscount,
            depositAmount,
            adjustmentAmount,
            chargeRemainingBalanceDaysAfterCheckout,
            expectedDeliveryTimeInDays,
            position,
            trialPeriodStartTime,
            sellingPlanId
        } = option;

        try {
            // If the function is to be idempotent, we should first check if a trial option with the given attributes already exists.
            const existingTrialOption = await api.trialOption.findBySellingPlanId(sellingPlanId);
            if (existingTrialOption) {
                logger.info({ existingTrialOption }, `[StoreId: ${trialRecord.shop}]: Trial option with sellingPlanId ${sellingPlanId} already exists. Skipping creation.`);
                continue;
            }

            const trialOptionRecord = await api.trialOption.create({
                name: optionName,
                trialPeriod: trialPeriodNumberOfDays,
                hasDeposit: setDeposit,
                hasDiscount: setDiscount,
                checkoutChargeType: PERCENTAGE,
                checkoutChargeValue: depositAmount,
                adjustmentType: PERCENTAGE,
                adjustmentValue: adjustmentAmount,
                remainingBalanceChargeTrigger: depositAmount === 100 ? NO_REMAINING_BALANCE : TIME_AFTER_CHECKOUT,
                remainingBalanceChargeTimeAfterCheckout: "P" + chargeRemainingBalanceDaysAfterCheckout + "D",
                remainingBalanceDaysAfterCheckout: chargeRemainingBalanceDaysAfterCheckout,
                expectedDeliveryTime: expectedDeliveryTimeInDays,
                position: position,
                trialPeriodStartTime: trialPeriodStartTime,
                category: TRY_BEFORE_YOU_BUY,
                sellingPlanId: sellingPlanId,
                trial: {
                    _link: trialRecord.id
                },
                shop: {
                    _link: trialRecord.shop
                }
            });

            if (trialOptionRecord?.error) {
                logger.error({ trialOptionRecord }, `[StoreId: ${trialRecord.shop}]: Failed to create trial option for trial model : ${trialRecord.id}. Error: ${trialOptionRecord.error}`);
                throw new Error(trialOptionRecord.error);
            } else {
                logger.info({ trialOptionRecord }, `[StoreId: ${trialRecord.shop}]: Successfully created and linked trial option to trial model : ${trialRecord.id}.`);
            }

        } catch (error) {
            logger.error({ error, option }, `[StoreId: ${trialRecord.shop}]: Error while processing trial option for trial model : ${trialRecord.id}.`);
            throw error;
        }
    }
}

export default createTrialOptions;
