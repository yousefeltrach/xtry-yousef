import React, { useState, useCallback, useEffect } from "react";
import {
    Modal,
    Layout,
    BlockStack,
    Checkbox,
} from "@shopify/polaris";
import { useForm, useField } from "@shopify/react-form";
import { AddMajor, EditMinor, SaveMinor } from "@shopify/polaris-icons";
import { v4 as uuidv4 } from 'uuid';

import DepositAmountRangeSelection from './DepositAmountRangeSelection.jsx';
import AdjustmentAmountRangeSelection from './AdjustmentAmountRangeSelection.jsx';
import TrialOptionName from "./TrialOptionName.jsx";
import TrialPeriodInDaysTextField from './TrialPeriodInDaysTextField.jsx';
import TrialPeriodStartTime from './TrialPeriodStartTime.jsx';
import { trialPeriod, depositValue, adjustmentValue } from "../../data/contstants.js";
import SetTrialPlanOptionAsPopular from "./SetTrialPlanOptionAsPopular.jsx";

export default function TrialOptionModal({ spOptions, toggleModal, addOption, editedOption, updateOption }) {
    const isEditMode = !!editedOption; // Check if editedOption is provided

    // Determine if any option in spOptions is already popular to set the default state
    const defaultIsPopular = spOptions?.some(option => option.isPopular);

    // Directly use useField for each field with conditional initial values.
    const optionName = useField(isEditMode ? editedOption.optionName : (spOptions[spOptions.length - 1]?.optionName || " "));
    const trialPeriodNumberOfDays = useField(isEditMode ? editedOption.trialPeriodNumberOfDays : (spOptions[spOptions.length - 1]?.trialPeriodNumberOfDays || trialPeriod.NumberOfDays));
    const trialPeriodStartTime = useField(isEditMode ? editedOption.trialPeriodStartTime : (spOptions[spOptions.length - 1]?.trialPeriodStartTime || trialPeriod.Start.AfterCheckout));
    const expectedDeliveryTimeInDays = useField(isEditMode ? editedOption.expectedDeliveryTimeInDays : (spOptions[spOptions.length - 1]?.expectedDeliveryTimeInDays || trialPeriod.expectedDeliveryTimeInDays));
    const setDeposit = useField(isEditMode ? editedOption.setDeposit : (spOptions[spOptions.length - 1]?.setDeposit || false));
    const depositAmount = useField(isEditMode ? editedOption.depositAmount : (spOptions[spOptions.length - 1]?.depositAmount || depositValue.NoDeposit));
    const setDiscount = useField(isEditMode ? editedOption.setDiscount : (spOptions[spOptions.length - 1]?.setDiscount || false));
    const adjustmentAmount = useField(isEditMode ? editedOption.adjustmentAmount : (spOptions[spOptions.length - 1]?.adjustmentAmount || adjustmentValue.NoAdjustment));
    const isPopular = useField(isEditMode ? editedOption.isPopular : false);


    const {
        submit, submitting, dirty,
    } = useForm({
        fields: { optionName, trialPeriodNumberOfDays, trialPeriodStartTime, expectedDeliveryTimeInDays, setDeposit, depositAmount, setDiscount, adjustmentAmount, isPopular },
        onSubmit: async (form) => {
            const newOption = {
                id: isEditMode ? editedOption.id : uuidv4(),
                sellingPlanId: isEditMode ? editedOption.sellingPlanId : null,
                optionName: form.optionName,
                trialPeriodNumberOfDays: parseInt(form.trialPeriodNumberOfDays),
                trialPeriodStartTime: form.trialPeriodStartTime,
                expectedDeliveryTimeInDays: parseInt(form.expectedDeliveryTimeInDays),
                chargeRemainingBalanceDaysAfterCheckout: chargeRemainingBalanceDaysAfterCheckout,
                setDeposit: form.setDeposit,
                depositAmount: parseFloat(form.depositAmount),
                setDiscount: form.setDiscount,
                adjustmentAmount: parseFloat(form.adjustmentAmount),
                isPopular: form.isPopular,
            };

            if (isEditMode) {
                updateOption(newOption);
            } else {
                addOption(newOption);
            }
            toggleModal();
        },
    });

    const [
        chargeRemainingBalanceDaysAfterCheckout,
        setChargeRemainingBalanceDaysAfterCheckout
    ] = useState(trialPeriodNumberOfDays.value);

    const [daysAfterCheckout, setDaysAfterCheckout] = useState(chargeRemainingBalanceDaysAfterCheckout);

    useEffect(() => {
        const calculatedDaysAfterCheckout = parseInt(expectedDeliveryTimeInDays.value) + parseInt(trialPeriodNumberOfDays.value);
        setDaysAfterCheckout(calculatedDaysAfterCheckout);
        setChargeRemainingBalanceDaysAfterCheckout(calculatedDaysAfterCheckout);
    }, [trialPeriodNumberOfDays.value, expectedDeliveryTimeInDays.value]);

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={open}
                onClose={toggleModal}
                title={isEditMode ? "Edit option" : "Add new option"}
                primaryAction={{
                    content: isEditMode ? 'Update option' : 'Add option',
                    icon: isEditMode ? SaveMinor : AddMajor,
                    onAction: submit,
                    disabled: !dirty,
                    loading: submitting
                }}
                large
            >
                <form onSubmit={submit}>
                    <Modal.Section>
                        <Layout sectioned>
                            <Layout.Section>
                                <BlockStack align="space-evenly" inlineAlign="stretch" gap={100}>
                                    <TrialOptionName
                                        trialPeriodNumberOfDays={trialPeriodNumberOfDays.value}
                                        depositAmountPercentage={depositAmount.value}
                                        adjustmentAmountPercentage={adjustmentAmount.value}
                                        spOptionName={optionName.value}
                                        onChange={optionName.onChange}
                                    />
                                    <TrialPeriodInDaysTextField
                                        trialPeriodNumberOfDays={trialPeriodNumberOfDays.value}
                                        onChange={trialPeriodNumberOfDays.onChange}
                                    />
                                    <TrialPeriodStartTime
                                        expectedDeliveryTimeInDays={expectedDeliveryTimeInDays.value}
                                        onChangeNumberOfDaysToReceiveTheOrder={expectedDeliveryTimeInDays.onChange}
                                        onChangeStartAfterTrialPeriod={trialPeriodStartTime.onChange}
                                        selectedStartAfterTrialPeriod={trialPeriodStartTime.value}
                                    />
                                    <DepositAmountRangeSelection
                                        setDeposit={setDeposit.value}
                                        depositAmountValue={depositAmount.value}
                                        onChange={depositAmount.onChange}
                                        onCheckedChange={setDeposit.onChange}
                                    />
                                    <AdjustmentAmountRangeSelection
                                        setDiscount={setDiscount.value}
                                        adjustmentAmountValue={adjustmentAmount.value}
                                        onChange={adjustmentAmount.onChange}
                                        onCheckedChange={setDiscount.onChange}
                                    />
                                    <SetTrialPlanOptionAsPopular
                                        isPopular={isPopular.value}
                                        onCheckedChange={isPopular.onChange}
                                    />
                                </BlockStack>
                            </Layout.Section>
                        </Layout>
                    </Modal.Section>
                </form>
            </Modal>
        </div>
    );
}
