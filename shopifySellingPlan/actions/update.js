import { applyParams, preventCrossShopDataAccess, save, ActionOptions, UpdateShopifySellingPlanActionContext } from "gadget-server";

/**
 * @param { UpdateShopifySellingPlanActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/**
 * @param { UpdateShopifySellingPlanActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update"
};
