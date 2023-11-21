import { TRY_BEFORE_YOU_BUY, PERCENTAGE, NO_REMAINING_BALANCE, TIME_AFTER_CHECKOUT } from '../common/constants';

function prepareSellingPlanInput(
  option,
  record,
  isUpdate = false,
  nameChanged = false,
  deliveryPolicyChanged = false,
  inventoryPolicyChanged = false
) {

  const remainBalanceObject = (option.depositAmount === 100)
    ? { remainingBalanceChargeTrigger: NO_REMAINING_BALANCE }
    : {
      remainingBalanceChargeTrigger: TIME_AFTER_CHECKOUT,
      remainingBalanceChargeTimeAfterCheckout: "P" + option.chargeRemainingBalanceDaysAfterCheckout + "D"
    };

  const sellingPlanInput = {
    category: TRY_BEFORE_YOU_BUY,
    position: option.position,
    billingPolicy: {
      fixed: {
        checkoutCharge: {
          type: PERCENTAGE,
          value: { percentage: parseFloat(option.depositAmount) }
        },
        ...remainBalanceObject
      }
    },
    pricingPolicies: [{
      fixed: {
        adjustmentType: PERCENTAGE,
        adjustmentValue: { percentage: parseFloat(option.adjustmentAmount) }
      }
    }],
    deliveryPolicy: {
      fixed: {
        fulfillmentTrigger: record.deliveryPolicy
      }
    },
    inventoryPolicy: {
      reserve: record.inventoryPolicy
    }
  };

  if (deliveryPolicyChanged) {
    sellingPlanInput.deliveryPolicy = {
      fixed: {
        fulfillmentTrigger: record.deliveryPolicy
      }
    };
  }

  if (inventoryPolicyChanged) {
    sellingPlanInput.inventoryPolicy = {
      reserve: record.inventoryPolicy
    };
  }

  // Set name if creating a new plan or if name has changed
  if (!isUpdate || nameChanged) {
    sellingPlanInput.name = option.optionName;
    sellingPlanInput.options = [option.optionName];
  }

  // Conditionally add the id if it's an update and the id exists
  if (isUpdate && option.sellingPlanId) {
    sellingPlanInput.id = 'gid://shopify/SellingPlan/' + option.sellingPlanId;
  }

  return sellingPlanInput;
}

export default prepareSellingPlanInput;
