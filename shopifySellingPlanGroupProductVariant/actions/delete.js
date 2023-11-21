import { transitionState, preventCrossShopDataAccess, deleteRecord, ActionOptions, ShopifySellingPlanGroupProductVariantState, DeleteShopifySellingPlanGroupProductVariantActionContext } from "gadget-server";

/**
 * @param { DeleteShopifySellingPlanGroupProductVariantActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, {from: ShopifySellingPlanGroupProductVariantState.Created, to: ShopifySellingPlanGroupProductVariantState.Deleted});
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/**
 * @param { DeleteShopifySellingPlanGroupProductVariantActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
