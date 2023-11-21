/**
 * Prepare trial plan record based on input parameters.
 * 
 * @param { import("gadget-server").CreateTrialActionContext } context - The context containing api, record, params, and logger.
 * @returns {Object} Updated record.
 */
async function prepareTrialRecord(api, record, params, logger) {
    logger.info({ record }, `[StoreId: ${record.shopId}]: Trial record object before updating params.`);

    // Get the minimum and maximum deposit, discount, and period from the options.
    const deposits = params.trialPlan.options.map(option => option.depositAmount);
    const discounts = params.trialPlan.options.map(option => option.adjustmentAmount);
    const periods = params.trialPlan.options.map(option => option.trialPeriodNumberOfDays);
    const chargeDates = params.trialPlan.options.map(option => option.chargeRemainingBalanceDaysAfterCheckout);

    const minDeposit = Math.min(...deposits);
    const maxDeposit = Math.max(...deposits);
    const minDiscount = Math.min(...discounts);
    const maxDiscount = Math.max(...discounts);
    const minPeriod = Math.min(...periods);
    const maxPeriod = Math.max(...periods);
    const minChargeDate = Math.min(...chargeDates);
    const maxChargeDate = Math.max(...chargeDates);

    const trialDepositSummary = deposits.length === 1 ?
        (minDeposit === 0 ? 'No deposit' : `${minDeposit}% deposit`) :
        `${minDeposit}-${maxDeposit}% deposit`;

    const trialDiscountSummary = discounts.length === 1 ?
        (minDiscount === 0 ? 'No discount' : `${minDiscount}% discount`) :
        `${minDiscount}-${maxDiscount}% discount`;

    const trialPeriodSummary = periods.length === 1 ? 
        `${minPeriod} day trial` : 
        `${minPeriod}-${maxPeriod} day trial`;

    const chargeBalanceSummary = chargeDates.length === 1 ? 
        `${minChargeDate} days after checkout` : 
        `${minChargeDate}-${maxChargeDate} days after checkout`;

    const chargeBalanceSummaryForDescription = chargeDates.length === 1 ? 
        `Balance charged ${minChargeDate} days after checkout` : 
        `Balance charged between ${minChargeDate}-${maxChargeDate} days after checkout`;

    const description = `Trial Plan: "${params.trialPlan.name}" offers a ${trialPeriodSummary}, ${trialDepositSummary}, and ${trialDiscountSummary}. ${chargeBalanceSummaryForDescription}.`;

    record.appId = api.applicationId;
    record.position = 1;
    record.depositSummary = trialDepositSummary;
    record.discountSummary = trialDiscountSummary;
    record.trialPeriodSummary = trialPeriodSummary;
    record.chargeBalanceSummary = chargeBalanceSummary;
    record.description = description;

    logger.info({ record }, `Trial record object after updating params.`);

}

export default prepareTrialRecord;
