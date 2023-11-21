import { preventCrossShopDataAccess, deleteRecord, ActionOptions, DeleteShopifyPriceRuleActionContext } from "gadget-server";

/**
 * @param { DeleteShopifyPriceRuleActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await preventCrossShopDataAccess(params, record);
  await deleteRecord(record);
};

/**
 * @param { DeleteShopifyPriceRuleActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
