import { applyParams, save, ActionOptions, CreateTrialPlanOptionActionContext, preventCrossShopDataAccess } from "gadget-server";

/**
 * @param { CreateTrialPlanOptionActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

/**
 * @param { CreateTrialPlanOptionActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create"
};
