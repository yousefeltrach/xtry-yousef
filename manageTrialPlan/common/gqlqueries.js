
const FETCH_SELLING_PLAN_GROUP_QUERY = `
  query fetchSellingPlanGroup($id: ID!) {
    sellingPlanGroup(id: $id) {
      id
      sellingPlans(first: 10) {
        edges {
          node {
            id
            position
            name
            options
            category
          }
        }
      }
    }
  }`;

const CREATE_SELLING_PLAN_GROUP_MUTATION = `
  mutation sellingPlanGroupCreate($input: SellingPlanGroupInput!, $resources: SellingPlanGroupResourceInput) {
    sellingPlanGroupCreate(input: $input, resources: $resources) {
      sellingPlanGroup {
        id,
        name,
        sellingPlans(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;

const UPDATE_SELLING_PLAN_GROUP_MUTATION = `
  mutation sellingPlanGroupUpdate($id: ID!, $input: SellingPlanGroupInput!) {
    sellingPlanGroupUpdate(id: $id, input: $input) {
      deletedSellingPlanIds
      sellingPlanGroup {
        id
        name
        sellingPlans(first: 10){
          edges {
            node {
              id
              name
              position
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;
  
  const GET_SELLING_PLAN_GROUP = `
  query sellingPlanGroup($id: ID!) {
    sellingPlanGroup(id: $id) {
      id
    }
  }
`;

const DELETE_SELLING_PLAN_GROUP = `
  mutation sellingPlanGroupDelete($id: ID!) {
    sellingPlanGroupDelete(id: $id) {
      deletedSellingPlanGroupId
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_PRODUCTS_FROM_SPG_MUTATION = `mutation sellingPlanGroupRemoveProducts($id: ID!, $productIds: [ID!]!) {
  sellingPlanGroupRemoveProducts(id: $id, productIds: $productIds) {
    removedProductIds
    userErrors {
      field
      message
    }
  }
}`;

const REMOVE_PRODUCTS_VARIANTS_FROM_SPG_MUTATION = `mutation sellingPlanGroupRemoveProductVariants($id: ID!, $productVariantIds: [ID!]!) {
  sellingPlanGroupRemoveProductVariants(id: $id, productVariantIds: $productVariantIds) {
    removedProductVariantIds
    userErrors {
      field
      message
    }
  }
}`;

const ADD_PRODUCT_VARIANTS_TO_SPG_MUTATION = `mutation sellingPlanGroupAddProductVariants($id: ID!, $productVariantIds: [ID!]!) {
  sellingPlanGroupAddProductVariants(id: $id, productVariantIds: $productVariantIds) {
    sellingPlanGroup {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

const ADD_PRODUCTS_TO_SPG_MUTATION = `mutation sellingPlanGroupAddProducts($id: ID!, $productIds: [ID!]!) {
  sellingPlanGroupAddProducts(id: $id, productIds: $productIds) {
    sellingPlanGroup {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

const FETCH_ASSOCIATED_PRODUCT_VARIANTS_IDS_QUERY = `
  query SellingPlanGroup($id: ID!) {
    sellingPlanGroup(id: $id) {
      id,
      name,
      productVariants(first: 10) {
        edges {
          node {
            id
          }
        }
      }
      products(first: 10) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;


module.exports = {
  FETCH_SELLING_PLAN_GROUP_QUERY,
  CREATE_SELLING_PLAN_GROUP_MUTATION,
  UPDATE_SELLING_PLAN_GROUP_MUTATION,
  GET_SELLING_PLAN_GROUP,
  DELETE_SELLING_PLAN_GROUP,
  REMOVE_PRODUCTS_FROM_SPG_MUTATION,
  REMOVE_PRODUCTS_VARIANTS_FROM_SPG_MUTATION,
  ADD_PRODUCT_VARIANTS_TO_SPG_MUTATION,
  ADD_PRODUCTS_TO_SPG_MUTATION,
  FETCH_ASSOCIATED_PRODUCT_VARIANTS_IDS_QUERY
};
