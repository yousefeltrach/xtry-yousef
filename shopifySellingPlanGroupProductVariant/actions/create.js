import { transitionState, applyParams, preventCrossShopDataAccess, save, ActionOptions, ShopifySellingPlanGroupProductVariantState, CreateShopifySellingPlanGroupProductVariantActionContext } from "gadget-server";

/**
 * @param { CreateShopifySellingPlanGroupProductVariantActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, {to: ShopifySellingPlanGroupProductVariantState.Created});
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/**
 * @param { CreateShopifySellingPlanGroupProductVariantActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create"
};
