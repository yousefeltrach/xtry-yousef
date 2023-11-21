// Helper function to generate a random ID
function generateRandomId() {
  return Math.floor(Math.random() * 100000).toString();
}

// Defines deposit values
export const depositValue = {
  NoDeposit: 0.0,
  Deposit25: 25.0,
  Deposit50: 50.0,
  Deposit75: 75.0,
  FullDeposit: 100.0,
};

export const adjustmentValue = {
  NoAdjustment: 0.0,
  adjustment5p: 5.0,
  adjustment10p: 10.0,
  adjustment15p: 15.0,
  adjustment20p: 20.0,
  adjustment25p: 25.0,
};

// Defines when to fulfill the order
export const sellingPlanFulfillmentTrigger = {
  Asap: "ASAP",
  Unknown: "UNKNOWN",
  ExactTime: "EXACT_TIME"
};

// Defines when to update the inventory
export const sellingPlanReserve = {
  OnSale: "ON_SALE",
  OnFulfillment: "ON_FULFILLMENT",
};

// Defines when to charge the remaining balance
export const sellingPlanRemainingBalanceChargeTrigger = {
  NoRemainingBalance: "NO_REMAINING_BALANCE",
  ExactTime: "EXACT_TIME",
  TimeAfterCheckout: "TIME_AFTER_CHECKOUT"
};

// Define the starting time of the trial period:
export const trialPeriod = {
  NumberOfDays: 7,
  Start: {
    AfterCheckout: 'After Checkout',
    AfterDelivery: 'After Delivery'
  },
  expectedDeliveryTimeInDays: 0,
}

export const initTrialPlanInput = {
  input: {
    name: "Trial plan name.",
    planTitle: "Trial plan internal note.",
    isPublished: false,
    category: "TRY_BEFORE_YOU_BUY",
    sellingPlanGroupId: null,
    options: [],
    remainingBalanceChargeTrigger: sellingPlanRemainingBalanceChargeTrigger.TimeAfterCheckout,
    fulfillmentTrigger: sellingPlanFulfillmentTrigger.Asap,
    inventoryReserve: sellingPlanReserve.OnFulfillment,
  },
  resources: {
    variants: [],
    products: [],
    productIds: [],
    productVariantsIds: [],
  },
};

