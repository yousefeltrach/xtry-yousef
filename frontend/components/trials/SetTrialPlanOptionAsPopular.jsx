import React, { useState, useCallback } from "react";
import { Badge, Box, Checkbox, InlineStack, RangeSlider, Text } from "@shopify/polaris";

export default function SetTrialPlanOptionAsPopular({
    isPopular,
    onCheckedChange,
}) {
    const [checked, setChecked] = useState(isPopular);

    const handleCheckChange = useCallback(
        (newChecked) => {
            setChecked(newChecked);
            onCheckedChange(newChecked);
        },
        [onCheckedChange]);

    return (
        <InlineStack align="start" gap={200}>
            <Box>
                <Checkbox labelHidden={true} checked={checked} onChange={handleCheckChange} />
            </Box>
            <Text as="span" variant="bodyMd">
                Set as{' '}
                {checked ? (
                    <Badge tone="attention">
                        Popular
                    </Badge>
                ) : (
                    'popular'
                )}
            </Text>
        </InlineStack>
    );
}
