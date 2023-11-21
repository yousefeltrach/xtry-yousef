import React, { useCallback, useEffect } from "react";
import { TextField } from "@shopify/polaris";

export default function TrialOptionName({
  trialPeriodNumberOfDays,
  depositAmountPercentage,
  adjustmentAmountPercentage,
  spOptionName,
  onChange
}) {

  useEffect(() => {
    if (depositAmountPercentage === 100) {
      if (adjustmentAmountPercentage === 0) {
        onChange(`${trialPeriodNumberOfDays}-day trial, full deposit.`);
      } else {
        onChange(`${trialPeriodNumberOfDays}-day trial, full deposit, save ${adjustmentAmountPercentage}%.`);
      }
    } else if (depositAmountPercentage === 0) {
      onChange(`Free ${trialPeriodNumberOfDays}-day trial.`);
    } else if (adjustmentAmountPercentage === 0) {
      onChange(`${trialPeriodNumberOfDays}-day trial, ${depositAmountPercentage}% deposit.`);
    } else {
      onChange(`${trialPeriodNumberOfDays}-day trial, ${depositAmountPercentage}% deposit, save ${adjustmentAmountPercentage}%.`);
    }
  }, [trialPeriodNumberOfDays, depositAmountPercentage, adjustmentAmountPercentage]);

  const handleChange = useCallback((newValue) => {
    onChange(newValue);
  }, [onChange]);

  return (
    <TextField
      label="Name"
      value={spOptionName}
      minLength={5}
      maxLength={60}
      onChange={handleChange}
      autoComplete="off"
      showCharacterCount
      disabled={true}
      helpText="Customers will see this option on the product page associated with this trial plan."
    />
  );
}