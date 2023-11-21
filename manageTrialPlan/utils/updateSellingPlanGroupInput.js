import prepareSellingPlanInput from './prepareSellingPlanInput';

async function updateSellingPlanGroupInput(record, existingSellingPlans, logger) {
    if (!record || !record.options) {
        logger.error({ record }, `[StoreId: ${record.shop}]: Missing necessary record properties.`);
        throw new Error(`[StoreId: ${record.shop}]: Invalid record data.`);
    }

    const sellingPlanGroupInput = {
        input: {
            appId: record.appId,
            name: record.name,
            description: record.description,
            merchantCode: record.merchantCode,
            options: [record.name],
            position: record.position,
            sellingPlansToCreate: [],
            sellingPlansToUpdate: [],
            sellingPlansToDelete: [],
        },
        trialOptions: {
            optionsToCreate: [],
            optionsToUpdate: [],
            optionsToDelete: [],
        },
    };

    const existingPlanMap = {};
    existingSellingPlans.forEach(plan => {
        existingPlanMap[plan.id] = plan;
    });

    const incomingPlanIdsSet = new Set(record.options.map(option => option.sellingPlanId));

    const deliveryPolicyChanged = record.changed && record.changed('deliveryPolicy');
    const inventoryPolicyChanged = record.changed && record.changed('inventoryPolicy');

    const shouldUpdatePlan = deliveryPolicyChanged || inventoryPolicyChanged;

    for (let option of record.options) {
        const existingPlan = existingPlanMap[option.sellingPlanId];

        const nameChanged = existingPlan && existingPlan.name !== option.optionName;

        if (existingPlan) {
            const hasChanges = existingPlan.position !== option.position;
            if (hasChanges || nameChanged || record.changed('options') || shouldUpdatePlan) {
                const sellingPlanInput = prepareSellingPlanInput(option, record, true, nameChanged, deliveryPolicyChanged, inventoryPolicyChanged);
                if (nameChanged) {
                    sellingPlanInput.name = option.optionName; // Set the updated name
                    sellingPlanInput.options = [option.optionName];
                }
                sellingPlanGroupInput.input.sellingPlansToUpdate.push(sellingPlanInput);
                sellingPlanGroupInput.trialOptions.optionsToUpdate.push(option);
            }
        } else {
            const sellingPlanInput = prepareSellingPlanInput(option, record, false);
            sellingPlanGroupInput.input.sellingPlansToCreate.push(sellingPlanInput);
            sellingPlanGroupInput.trialOptions.optionsToCreate.push(option);
        }
    }

    // Identify and add the selling plans that need to be deleted.
    for (let existingPlanId in existingPlanMap) {
        if (!incomingPlanIdsSet.has(existingPlanId)) {
            // Construct the global ID
            const globalId = `gid://shopify/SellingPlan/${existingPlanId}`;
            sellingPlanGroupInput.input.sellingPlansToDelete.push(globalId);
            sellingPlanGroupInput.trialOptions.optionsToDelete.push(existingPlanMap[existingPlanId]);
        }
    }


    if (record.changed('name')) {
        sellingPlanGroupInput.input.name = record.name;
    }

    if (record.changed('merchantCode')) {
        sellingPlanGroupInput.input.merchantCode = record.merchantCode;
    }

    logger.info({ sellingPlanGroupInput }, `[StoreId: ${record.shop}]: Selling plan group Payload for store:`);

    return sellingPlanGroupInput;
}

export default updateSellingPlanGroupInput;
