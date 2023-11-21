import React, { useCallback, useState } from "react";
import { TextField } from "@shopify/polaris";

export default function TrialPeriodInDaysTextField(
    {
        trialPeriodNumberOfDays,
        onChange
    }
) {

    const [error, setError] = useState(null);

    const validateTrialPeriod = (value) => {
        if (parseInt(value) <= 2) {
            setError('Trial period must be greater than 2 days.');
        } else if (parseInt(value) > 30) {
            setError('Trial period must be less than or equal to 30 days.');
        } else {
            setError(null);
        }
    }

    const handleNumberOfTrialDaysChange = useCallback((newValue) => {
        validateTrialPeriod(newValue);
        onChange(newValue);
    }, [onChange]);

    return (
            <TextField
                label='Trial period'
                type='number'
                suffix="Days."
                value={trialPeriodNumberOfDays}
                onChange={handleNumberOfTrialDaysChange}
                autoComplete="off"
                helpText="Buyers will see this value."
                error={error}
                min={2}
                max={30}
            />
    );
}
