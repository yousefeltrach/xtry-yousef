import React, { useState, useCallback } from "react";
import { Checkbox, RangeSlider } from "@shopify/polaris";

export default function AdjustmentAmountRangeSelection({
  setDiscount,
  adjustmentAmountValue,
  onChange,
  onCheckedChange,
}) {
  const [checked, setChecked] = useState(setDiscount);
  const handleCheckChange = useCallback(
    (newChecked) => {
      setChecked(newChecked);
      onCheckedChange(newChecked);
      onChange(0);
    }, 
    [onCheckedChange]);

 
  const handleRangeAdjustmentPAmountChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <>
      <Checkbox label="Set discount" checked={checked} onChange={handleCheckChange} />
      {checked && (
        <RangeSlider
          label="Set discount value"
          value={parseInt(adjustmentAmountValue)}
          onChange={handleRangeAdjustmentPAmountChange}
          output
          max={100}
          min={0}
          suffix="100%"
          prefix="0%"
          helpText={`Buyers will get ${adjustmentAmountValue}% discount.`}
        />
      )}
    </>
  );
}
