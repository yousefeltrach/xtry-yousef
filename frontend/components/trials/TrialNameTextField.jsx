import React, { useCallback, useState, useEffect } from "react";
import { TextField } from "@shopify/polaris";

export default function TrialNameTextField({
  placeholder,
  purchaseOptionName,
  onChange,
  trialNames,
}) {
  const [lengthErrorMessage, setLengthErrorMessage] = useState(null);
  const [existsErrorMessage, setExistsErrorMessage] = useState(null);

  const validateTrialNameLength = (name) => {
    if (!name || name.trim().length < 3) {
      setLengthErrorMessage("The plan name must be at least 3 characters long.");
    } else {
      setLengthErrorMessage(null);
    }
  };

  const validateTrialNameExists = (name) => {
    if (trialNames && trialNames.includes(name)) {
      setExistsErrorMessage("This plan name already exists, please choose a unique name.");
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
      validateTrialNameLength(purchaseOptionName);
      validateTrialNameExists(purchaseOptionName);
    },
    [purchaseOptionName]
  );

  const handleFocus = useCallback(
    () => {
      onChange(""); // Clear the value on focus
    },
    [onChange]
  );

  useEffect(() => {
    // Validate trialName once the component is mounted.
    validateTrialNameExists(purchaseOptionName.trim());
  }, [handleChange, purchaseOptionName]);

  return (
    <TextField
      label="Plan name"
      placeholder={placeholder}
      value={purchaseOptionName}
      minLength={3}
      maxLength={25}
      onChange={handleChange}
      // onFocus={handleFocus}
      autoComplete="off"
      showCharacterCount
      error={lengthErrorMessage || existsErrorMessage}
      onBlur={handleBlur}
      helpText="Customers will see this value on the storefront product page of any product associated with this trial plan."
    />
  );
}
