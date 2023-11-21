import React, { useCallback, useState, useEffect } from "react";
import { TextField } from "@shopify/polaris";

export default function PlanTitleTextField({
  placeholder,
  planTitle,
  onChange,
  trialPlanTitles
}) {

  const [lengthErrorMessage, setLengthErrorMessage] = useState(null);
  const [existsErrorMessage, setExistsErrorMessage] = useState(null);

  const validatePlanTitleLength = (planTitle) => {
    if (!planTitle || planTitle.trim().length < 3) {
      setLengthErrorMessage("The plan title must be at least 3 characters long.");
    } else {
      setLengthErrorMessage(null);
    }
  };

  const validatePlanTitleExists = (planTitle) => {
    if (trialPlanTitles && trialPlanTitles.includes(planTitle)) {
      setExistsErrorMessage("This plan title already exists. Please choose a unique name to avoid confusion.");
    } else {
      setExistsErrorMessage(null);
    }
  };

  const handleChange = useCallback(
    (newValue) => {
      const formattedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      onChange(formattedValue);
    },
    [onChange]
  );

  const handleBlur = useCallback(
    () => {
      validatePlanTitleLength(planTitle);
      validatePlanTitleExists(planTitle);
    },
    [planTitle]
  );

  const handleFocus = useCallback(
    () => {
      onChange(""); // Clear the value on focus
    },
    [onChange]
  );

  useEffect(() => {
    validatePlanTitleExists(planTitle.trim());
  }, [handleChange, planTitle]);

  return (
    <TextField
      label="Plan title"
      placeholder={placeholder}
      value={planTitle}
      minLength={3}
      maxLength={45}
      onChange={handleChange}
      // onFocus={handleFocus}
      autoComplete="off"
      showCharacterCount
      onBlur={handleBlur}
      error={lengthErrorMessage || existsErrorMessage}
      helpText="Customers won't see this value. It's for internal use only. Displayed within Shopify admin product listing."
    />
  );
}
