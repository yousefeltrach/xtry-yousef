import React, { useCallback, useEffect, useState } from "react";
import { ChoiceList, TextField } from "@shopify/polaris";
import { trialPeriod } from "../../data/contstants.js";

export default function TrialPeriodStartTime({
  expectedDeliveryTimeInDays,
  onChangeNumberOfDaysToReceiveTheOrder,
  onChangeStartAfterTrialPeriod,
  selectedStartAfterTrialPeriod,
}) {
  const startAfterCheckoutValue = trialPeriod.Start.AfterCheckout;
  const startAfterDeliveryValue = trialPeriod.Start.AfterDelivery;

  const [error, setError] = useState(null);

  const validateExpectedDeliveryDays = (value) => {
    if (parseInt(value) <= 0) {
      setError('Expected delivery time must be greater than 0.');
    } else {
      setError(null);
    }
  }

  const handleStartAfterTrialPeriodChange = useCallback((value) => {
    // Since we only want a single value, ensure we always pass a string to the parent's onChange handler
    const stringValue = Array.isArray(value) ? value[0] : value;
    onChangeStartAfterTrialPeriod(stringValue);
  }, [onChangeStartAfterTrialPeriod]);

  const handleExpectedDeliveryTimeInDaysChange = useCallback(
    (value) => {
      validateExpectedDeliveryDays(value);
      onChangeNumberOfDaysToReceiveTheOrder(value);
    },
    [onChangeNumberOfDaysToReceiveTheOrder]
  );

  useEffect(() => {
    if (selectedStartAfterTrialPeriod === startAfterCheckoutValue) {
      onChangeNumberOfDaysToReceiveTheOrder(0)
    }
  }, [selectedStartAfterTrialPeriod]);

  const renderExpectedDeliveryPeriodInDaysChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          key="numberOfDays"
          label="Number of days after checkout date"
          type="number"
          onChange={handleExpectedDeliveryTimeInDaysChange}
          value={expectedDeliveryTimeInDays}
          min={0}
          suffix="Day(s)."
          autoComplete="off"
          error={error}
          helpText={`When do customers expect to receive the package after the checkout date? 
                        -- In ${expectedDeliveryTimeInDays} day(s).`}
        />
      ),
    [handleExpectedDeliveryTimeInDaysChange, expectedDeliveryTimeInDays]
  );

  return (
    <ChoiceList
      choices={[
        {
          label: "Start after checkout date.",
          value: startAfterCheckoutValue,
          helpText: "The trial period start once the customer completed the checkout.",
        },
        {
          label: "Start after delivery date.",
          value: startAfterDeliveryValue,
          helpText: "The trial period start once the customer has received the first product.",
          renderChildren: renderExpectedDeliveryPeriodInDaysChildren,
        },
      ]}
      selected={selectedStartAfterTrialPeriod}
      onChange={handleStartAfterTrialPeriodChange}
    />
  );
}
