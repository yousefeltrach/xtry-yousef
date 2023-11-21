import { preventCrossShopDataAccess, deleteRecord, ActionOptions, DeleteShopifySubscriptionLineActionContext } from "gadget-server";

/**
 * @param { DeleteShopifySubscriptionLineActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/**
 * @param { DeleteShopifySubscriptionLineActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
