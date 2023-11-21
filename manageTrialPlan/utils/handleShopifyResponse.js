function handleShopifyResponse(response, logger) {
  // Extract the relevant data from the response based on whether it's a create or update operation
  const operationType = response?.sellingPlanGroupCreate ? 'sellingPlanGroupCreate' : 'sellingPlanGroupUpdate';
  const sellingPlanGroup = response?.[operationType]?.sellingPlanGroup;
  const userErrors = response?.[operationType]?.userErrors;

  // Handle any user errors
  if (Array.isArray(userErrors) && userErrors.length > 0) {
      logger.error({ userErrors }, 'Failed to create/update selling plan group in Shopify.');
      throw new Error(JSON.stringify(userErrors));
  }

  // Ensure the response has the expected structure
  if (!sellingPlanGroup || typeof sellingPlanGroup.id !== 'string') {
      logger.error({ response }, 'Received invalid response from Shopify when trying to create/update selling plan group.');
      return null;
  }

  // Extract IDs
  const sellingPlanGroupId = extractIdFromGID(sellingPlanGroup.id);
  const sellingPlansIds = sellingPlanGroup.sellingPlans?.edges?.map(edge => extractIdFromGID(edge.node.id)) || [];

  logger.info({ response }, 'Selling plan group has been created/updated successfully in Shopify.');

  return {
      sellingPlanGroupId,
      sellingPlansIds
  };
}

// Helper function to extract the ID from a global ID
function extractIdFromGID(globalId) {
  return globalId.split("/").pop();
}

export default handleShopifyResponse;
