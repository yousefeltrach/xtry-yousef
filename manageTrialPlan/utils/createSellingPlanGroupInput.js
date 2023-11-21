import prepareSellingPlanInput from './prepareSellingPlanInput';

async function createSellingPlanGroupInput(record, logger) {
  // Check if the record exists, has the options property, and at least one option
  if (!record || !Array.isArray(record.options) || record.options.length === 0) {
      logger.error({ record }, `[StoreId: ${record.shop}]: Missing necessary record properties or no options provided.`);
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
          sellingPlansToUpdate: [],  // Likely won't be used in a create scenario, but kept for structure consistency.
          sellingPlansToDelete: []   // Likewise.
      },
      resources: {
          productVariantIds: record.productVariantsIds,
      }
  };

  record.options.forEach(option => {
      if (!option.sellingPlanId || option.sellingPlanId === '') {
          sellingPlanGroupInput.input.sellingPlansToCreate.push(prepareSellingPlanInput(option, record, false));
      }
  });

  logger.info({ sellingPlanGroupInput }, `[StoreId: ${record.shop}]: Selling plan group Payload for store:`);

  return sellingPlanGroupInput;
}

export default createSellingPlanGroupInput;
