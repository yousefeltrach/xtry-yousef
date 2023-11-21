import { deleteRecord, ActionOptions, DeleteOnBordingActionContext } from "gadget-server";

/**
 * @param { DeleteOnBordingActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
};

/**
 * @param { DeleteOnBordingActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
