import { transitionState, preventCrossShopDataAccess, deleteRecord, ActionOptions, ShopifySellingPlanGroupProductState, DeleteShopifySellingPlanGroupProductActionContext } from "gadget-server";

/**
 * @param { DeleteShopifySellingPlanGroupProductActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  transitionState(record, {from: ShopifySellingPlanGroupProductState.Created, to: ShopifySellingPlanGroupProductState.Deleted});
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/**
 * @param { DeleteShopifySellingPlanGroupProductActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
