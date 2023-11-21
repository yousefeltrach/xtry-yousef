import {DELETE_SELLING_PLAN_GROUP} from "../../common/gqlqueries";

async function deleteSellingPlanGroup(connections, record, logger){

    const spgId = 'gid://shopify/SellingPlanGroup/' + record.sellingPlanGroupId;
    logger.debug({spgId}, `Selling plan group Id ${spgId} got it from ${record.sellingPlanGroupId}`);

    const deleteResponse = await connections.shopify.current?.graphql(
        DELETE_SELLING_PLAN_GROUP, 
        { id: spgId }
    );

  if (deleteResponse.sellingPlanGroupDelete.userErrors.length == 0) {
    logger.info({ response: deleteResponse },
         `[StoreId: ${record.shopId}]: Success. Selling plan group deleted.`);
  } else {
    logger.error({ response: deleteResponse },
         `[StoreId: ${record.shopId}]: Failed. Encountered errors while deleting the selling plan group.`);
  }
}

export default deleteSellingPlanGroup;