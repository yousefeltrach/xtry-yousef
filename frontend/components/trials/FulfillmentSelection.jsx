import { useCallback } from "react";
import { RadioButton, Card, BlockStack, Text } from "@shopify/polaris";
import { sellingPlanFulfillmentTrigger } from "../../data/contstants.js";
import FulfillmentDate from './FulfillmentDate.jsx';

export default function FulfillmentSelection({ category, fulfillmentTrigger, fulfillmentDate, onFulfillmentDateChange, onTypeChange }) {

    const handleSelectionChange = useCallback((_checked, newValue) => {
        onTypeChange(newValue);
    }, []);

    const hasAsapFulfillment =
        fulfillmentTrigger === sellingPlanFulfillmentTrigger.Asap;
    const hasUnknownFulfillment =
        fulfillmentTrigger === sellingPlanFulfillmentTrigger.Unknown;
    const hasExactTimeFulfillment =
        fulfillmentTrigger === sellingPlanFulfillmentTrigger.ExactTime;

    return (
        <Card>
            <BlockStack align="space-evenly" inlineAlign="start" gap={300}>
                <Text as="h2" fontWeight="bold" variant="headingMd" alignment="start">Delivery</Text>
                <RadioButton
                    label="As soon as possible"
                    helpText="The order is fulfilled when the order is created."
                    id={sellingPlanFulfillmentTrigger.Asap}
                    checked={hasAsapFulfillment}
                    onChange={handleSelectionChange}
                />
                {category === "PRE_ORDER" && (
                    <RadioButton
                        label="Exact time"
                        helpText="The order is fulfilled on a specific date."
                        id={sellingPlanFulfillmentTrigger.ExactTime}
                        checked={hasExactTimeFulfillment}
                        onChange={handleSelectionChange}
                    />
                )}
                {hasExactTimeFulfillment && (
                    <FulfillmentDate
                        fulfillmentDate={fulfillmentDate}
                        onChange={onFulfillmentDateChange}
                    />
                )}
                <RadioButton
                    label="Unknown"
                    helpText="The fulfillment date is unknown."
                    id={sellingPlanFulfillmentTrigger.Unknown}
                    checked={hasUnknownFulfillment}
                    onChange={handleSelectionChange}
                />
            </BlockStack>
        </Card>
    );
}
