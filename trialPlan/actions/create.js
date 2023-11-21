import { applyParams, save, ActionOptions, CreateTrialPlanActionContext, preventCrossShopDataAccess } from "gadget-server";
import prepareTrialRecord from "../../manageTrialPlan/utils/prepareTrialRecord";

/**
 * @param { CreateTrialPlanActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  applyParams(params, record);

  logger.debug({"Incoming params": params, "Record": record},
        "Apply incoming params and prevent cross shop data access stage.");

  await preventCrossShopDataAccess(params, record);
  await prepareTrialRecord(api, record, params, logger);

  logger.debug({"Record prepared": params, "Record": record},
        "Prepare trial plan record stage.");
  
  await save(record);
};

/**
 * @param { CreateTrialPlanActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
   if(!record.isPublished){
      logger.info("Record is not published yet to Shopify.", record.isPublished);
   }else{
      logger.info("Record will be published to Shopify.", record.isPublished);
      // TODO add code to call publish endpoint.
   }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create"
};
