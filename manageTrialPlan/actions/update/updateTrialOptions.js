import { TRY_BEFORE_YOU_BUY, PERCENTAGE, NO_REMAINING_BALANCE, TIME_AFTER_CHECKOUT } from '../../common/constants';

async function updateTrialOptions(api, trialOptions, trialRecord, logger) {

    // Early exit if no trialOptions are provided.
    if (!trialOptions || trialOptions.length === 0) {
        logger.warn({ trialRecord }, `[StoreId: ${trialRecord.shop}]: No trial options provided.`);
        return;
    }
    
    logger.info({ trialRecord }, `[StoreId: ${trialRecord.shop}]: We update and link trial options to trial model : ${trialRecord.id}`);
    let response;

    try {
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

            const existingTrialOption = await api.trialOption.findBySellingPlanId(sellingPlanId);
            logger.debug({ existingTrialOption }, `Existing trial option related to selling plan Id: ${sellingPlanId}`);

            if (!existingTrialOption) {
                logger.warn({ sellingPlanId }, `[StoreId: ${trialRecord.shop}]: No trial option found for sellingPlanId ${sellingPlanId}. Skipping update.`);
                continue;
            }

            response = await api.trialOption.update(existingTrialOption.id, {
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

            if (response?.error) {
                logger.error({ response }, `[StoreId: ${trialRecord.shop}]: Failed to update trial option and linked to trial model : ${trialRecord.id}.`);
                throw new Error(response.error);
            } else {
                logger.info({ response }, `[StoreId: ${trialRecord.shop}]: Trial option updated and linked successfully to trial model : ${trialRecord.id}.`);
            }

            logger.info({ response }, `[StoreId: ${trialRecord.shop}]: Update trial option response and linked to trial model : ${trialRecord.id}.`);
        }
    } catch (error) {
        logger.error({ response }, `[StoreId: ${trialRecord.shop}]: Failed to update trial option and linked to trial model : ${trialRecord.id}.`);
        throw error;
    }
}

export default updateTrialOptions;
