import { CREATE_SELLING_PLAN_GROUP_MUTATION } from '../../common/gqlqueries';
import createSellingPlanGroupInput from '../../utils/createSellingPlanGroupInput';
import handleShopifyResponse from '../../utils/handleShopifyResponse';

async function createSellingPlanGroup(record, connections, logger) {

    const sellingPlanGroupInput = await createSellingPlanGroupInput(record, logger);

    const gqlPayload = {
        input: sellingPlanGroupInput.input,
        resources: sellingPlanGroupInput.resources
    };
  
    try {
        const response = await connections.shopify.current?.graphql(CREATE_SELLING_PLAN_GROUP_MUTATION, gqlPayload);
        const shopifyData = handleShopifyResponse(response, logger);

        if (shopifyData) {

            record.id = shopifyData.sellingPlanGroupId;
            record.sellingPlanGroupId = shopifyData.sellingPlanGroupId;
            logger.warn({record}, `[StoreId: ${record.shop}]: Shopify record after shopify data object.`)
        
            for (let i = 0; i < shopifyData.sellingPlansIds.length; i++) {
              record.options[i].sellingPlanId = shopifyData.sellingPlansIds[i];
              record.options[i].id = shopifyData.sellingPlansIds[i];
              logger.warn({record}, `[StoreId: ${record.shop}]: Shopify record after shopify data object to check selling plans.`)
        
            }
          }
          logger.info({ record }, `[StoreId: ${record.shop}]: The trial record after creating the resource.`);

        return shopifyData;
        
    } catch (error) {
        logger.error({ error }, `[StoreId: ${record.shop}]: Exception raised sending query to Shopify.`);
        throw new Error(error);
    }
}

export default createSellingPlanGroup;