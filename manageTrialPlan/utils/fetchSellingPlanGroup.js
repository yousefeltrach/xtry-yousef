import { FETCH_SELLING_PLAN_GROUP_QUERY } from '../common/gqlqueries';

//#region fetchSellingPlanGroup
async function fetchSellingPlanGroup(api, record, connections, logger) {
      
  if (!record.sellingPlanGroupId) {
      logger.info({ record }, `[StoreId: ${record.shop}]: sellingPlanGroupId is not provided.`);
      return { exists: false, data: null };
  }

  const trialRecord = await api.trial.maybeFindOne(record.sellingPlanGroupId);

  if (!trialRecord) {
      logger.info({ record }, `[StoreId: ${record.shop}]: No trial record found for sellingPlanGroupId ${record.sellingPlanGroupId}.`);
      return { exists: false, data: null };
  }

  logger.info({ record }, `[StoreId: ${record.shop}]: Selling plan exists. Fetch it.`);
  const fetchResponse = await connections.shopify.current?.graphql(
      FETCH_SELLING_PLAN_GROUP_QUERY,
      { id: `gid://shopify/SellingPlanGroup/${record.sellingPlanGroupId}` }
  );

  if (!fetchResponse?.sellingPlanGroup?.sellingPlans?.edges) {
      logger.error({ record }, `[StoreId: ${record.shop}]: Failed to fetch selling plans for Shopify ID: ${record.sellingPlanGroupId}.`);
      return { exists: false, data: null };
  }

  logger.info({ fetchResponse }, `[StoreId: ${record.shop}]: Fetched selling plans response from Shopify ID: ${record.sellingPlanGroupId}.`);

  const sellingPlans = fetchResponse.sellingPlanGroup.sellingPlans.edges.map(edge => {
      return {
          id: edge.node.id.split("/").pop(),
          position: edge.node.position
      };
  });

  return { exists: true, data: sellingPlans };
}

//#endregion

export default fetchSellingPlanGroup;
