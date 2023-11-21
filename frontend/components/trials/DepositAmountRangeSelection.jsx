import React, { useState, useCallback } from "react";
import { Checkbox, RangeSlider } from "@shopify/polaris";

export default function DepositAmountRangeSelection({ setDeposit, depositAmountValue, onChange, onCheckedChange }) {

  // console.log({"Deposit checked?": setDeposit})
  const [checked, setChecked] = useState(setDeposit);
  const handleCheckChange = useCallback(
    (newChecked) => {
      setChecked(newChecked);
      onCheckedChange(newChecked);
      onChange(0);
    },
    [onCheckedChange]
  );

  // Handle the state of deposit percentage amount change - Start at 25%.
  const handleRangeDepositPAmountChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange]
  );

  return (

    <>
      <Checkbox label="Set deposit" checked={checked} onChange={handleCheckChange} />
      {checked && (
        <RangeSlider
          label="Deposit amount percentage"
          value={parseInt(depositAmountValue)}
          onChange={handleRangeDepositPAmountChange}
          output
          max={100}
          min={0}
          suffix="100%"
          prefix="0%"
          helpText={`Buyers will need to make a ${depositAmountValue}% deposit at checkout.`}
        />
      )}
    </>
  );
}
