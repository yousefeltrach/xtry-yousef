import { useCallback } from "react";
import { Card, BlockStack, RadioButton, Text } from "@shopify/polaris";
import { sellingPlanReserve } from "../../data/contstants.js"

export default function InventoryReserve({ inventoryReservation, onChange }) {
    const handleChange = useCallback(
        (_checked, newValue) => onChange(newValue),
        []
    );

    return (
        <Card>
            <BlockStack align="space-evenly" inlineAlign="start" gap={300}>
                <Text as="h2" fontWeight="bold" variant="headingMd" alignment="start">Inventory</Text>
                <RadioButton
                    label="On Sale"
                    helpText="The inventory is updated when the order is created."
                    id={sellingPlanReserve.OnSale}
                    onChange={handleChange}
                    checked={inventoryReservation === sellingPlanReserve.OnSale}
                />
                <RadioButton
                    label="On Fulfillment"
                    helpText="The inventory is updated when the order is fulfilled."
                    id={sellingPlanReserve.OnFulfillment}
                    onChange={handleChange}
                    checked={inventoryReservation === sellingPlanReserve.OnFulfillment}
                />
            </BlockStack>
        </Card>

    );
}