// import { 
//   TRY_BEFORE_YOU_BUY, PERCENTAGE, NO_REMAINING_BALANCE, TIME_AFTER_CHECKOUT 
// } from '../common/constants';

// function prepareSellingPlanInput(option, record, existingPlan = null) {
//   const sellingPlanInput = {
//     name: '',
//     options: [],
//     position: 0,
//     category: '',
//     deliveryPolicy: {
//       fixed: {}
//     },
//     inventoryPolicy: {},
//     billingPolicy: {
//       fixed: {}
//     },
//     pricingPolicies: [{
//       fixed: {}
//     }]
//   };

//   // Common utility function to check if two percentages are the same
//   const arePercentagesEqual = (value1, value2) => parseFloat(value1) === parseFloat(value2);

//   const isEqualBillingPolicyFixed = (a, b) => {
//     return a.checkoutCharge.type === b.checkoutCharge.type &&
//            arePercentagesEqual(a.checkoutCharge.value.percentage, b.checkoutCharge.value.percentage) &&
//            a.remainingBalanceChargeTrigger === b.remainingBalanceChargeTrigger;
//   };

//   const hasPositionChanged = !existingPlan || (existingPlan.position !== option.position);
//   const hasNameChanged = !existingPlan || (existingPlan.name !== option.optionName);
//   const hasCategoryChanged = !existingPlan || (existingPlan.category !== TRY_BEFORE_YOU_BUY);

//   if (!existingPlan || hasPositionChanged || hasNameChanged || hasCategoryChanged) {
//     sellingPlanInput.name = option.optionName;
//     sellingPlanInput.options = [option.optionName];
//     sellingPlanInput.position = option.position;
//     sellingPlanInput.category = TRY_BEFORE_YOU_BUY;
//   }

//   if (!existingPlan || existingPlan.deliveryPolicy.fixed.fulfillmentTrigger !== record.deliveryPolicy) {
//     sellingPlanInput.deliveryPolicy.fixed.fulfillmentTrigger = record.deliveryPolicy;
//   }

//   if (!existingPlan || existingPlan.inventoryPolicy.reserve !== record.inventoryPolicy) {
//     sellingPlanInput.inventoryPolicy.reserve = record.inventoryPolicy;
//   }

//   const remainBalanceObject = (option.depositAmount === 100)
//     ? { remainingBalanceChargeTrigger: NO_REMAINING_BALANCE }
//     : {
//         remainingBalanceChargeTrigger: TIME_AFTER_CHECKOUT,
//         remainingBalanceChargeTimeAfterCheckout: "P" + option.chargeRemainingBalanceDaysAfterCheckout + "D"
//     };

//   if (!existingPlan || 
//       existingPlan.billingPolicy.fixed.checkoutCharge.type !== PERCENTAGE ||
//       !arePercentagesEqual(existingPlan.billingPolicy.fixed.checkoutCharge.value.percentage, option.depositAmount) ||
//       !isEqualBillingPolicyFixed(existingPlan.billingPolicy.fixed, remainBalanceObject)) {

//     sellingPlanInput.billingPolicy.fixed = {
//       checkoutCharge: {
//         type: PERCENTAGE,
//         value: { percentage: parseFloat(option.depositAmount) }
//       },
//       ...remainBalanceObject
//     };
//   }

//   if (!existingPlan || 
//       existingPlan.pricingPolicies[0].fixed.adjustmentType !== PERCENTAGE ||
//       !arePercentagesEqual(existingPlan.pricingPolicies[0].fixed.adjustmentValue.percentage, option.adjustmentAmount)) {

//     sellingPlanInput.pricingPolicies[0].fixed = {
//       adjustmentType: PERCENTAGE,
//       adjustmentValue: { percentage: parseFloat(option.adjustmentAmount) }
//     };
//   }

//   // If this is an update operation, always set the ID (it's crucial for update operations)
//   if (existingPlan && option.sellingPlanId) {
//     sellingPlanInput.id = 'gid://shopify/SellingPlan/' + option.sellingPlanId;
//   }

//   return sellingPlanInput;
// }

// export default prepareSellingPlanInput;

// import { TRY_BEFORE_YOU_BUY, PERCENTAGE, NO_REMAINING_BALANCE, TIME_AFTER_CHECKOUT } from '../common/constants';

// //#region createSellingPlan.
// function prepareSellingPlanInput(option, record, isUpdate = false) {
//   const remainBalanceObject = (option.depositAmount === 100)
//     ? { remainingBalanceChargeTrigger: NO_REMAINING_BALANCE }
//     : {
//       remainingBalanceChargeTrigger: TIME_AFTER_CHECKOUT,
//       remainingBalanceChargeTimeAfterCheckout: "P" + option.chargeRemainingBalanceDaysAfterCheckout + "D"
//     };

//   const sellingPlanInput = {
//     name: option.optionName,
//     options: [option.optionName],
//     category: TRY_BEFORE_YOU_BUY,
//     position: option.position,
//     billingPolicy: {
//       fixed: {
//         checkoutCharge: {
//           type: PERCENTAGE,
//           value: { percentage: parseFloat(option.depositAmount) }
//         },
//         ...remainBalanceObject
//       }
//     },
//     pricingPolicies: [{
//       fixed: {
//         adjustmentType: PERCENTAGE,
//         adjustmentValue: { percentage: parseFloat(option.adjustmentAmount) }
//       }
//     }],
//     deliveryPolicy: {
//       fixed: {
//         fulfillmentTrigger: record.deliveryPolicy
//       }
//     },
//     inventoryPolicy: {
//       reserve: record.inventoryPolicy
//     }
//   };

//   // Conditionally add the id if it's an update and the id exists
//   if (isUpdate && option.sellingPlanId) {
//       sellingPlanInput.id = 'gid://shopify/SellingPlan/' + option.sellingPlanId;
//   }

//   return sellingPlanInput;
// }

// //#endregion

// export default prepareSellingPlanInput;

