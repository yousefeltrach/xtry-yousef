import { Modal, TextField, Text, Badge, BlockStack } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { CancelMinor, DeleteMinor } from '@shopify/polaris-icons';
import { useField, useForm } from '@shopify/react-form';
import { useNavigate, useToast } from "@shopify/app-bridge-react";

import { api } from "../../api";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function DeleteConfirmation({ trialInput, onClose, onDeleteSuccess }) {

    const [active, setActive] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const toggleModal = useCallback(() => {
        setActive(false);
        onClose && onClose();
    }, [onClose]);

    const {
        fields: { typedTrialName },
        submit, submitting, dirty,
    } = useForm({
        fields: {
            typedTrialName: useField(''),
        },
        onSubmit: async (form) => {

            const displayToast = (message, delay = 1000) => {
                setTimeout(() => {
                    toast.show(message);
                }, delay);
            };

            if (form.typedTrialName === trialInput.input.name) {
                let response; 
                try {
                    response = await api.trial.delete(String(trialInput.input.id));
                    if (response?.error) {
                        const errorMsg = `Failed to remove ${form.typedTrialName}.`;
                        displayToast(errorMsg);
                        toggleModal();
                        onClose(errorMsg);
                    } else {
                        displayToast(`${form.typedTrialName} successfully removed.`);
                        onDeleteSuccess && onDeleteSuccess(); // Invoke the callback after a successful delete
                    }
                } catch (error) {
                    console.error(response?.error);
                    displayToast(`Failed to remove ${form.typedTrialName}.`);
                }

                toggleModal();
            } else {
                setErrorMessage(`Attempted to delete ${trialInput.input.name} instead of ${form.typedTrialName}`);
            }
        }
    });

    return (
        <div style={{ height: '500px' }}>
            <Modal
                open={active}
                onClose={toggleModal}
                title="Delete permanently"
                primaryAction={{
                    content: 'Delete',
                    destructive: true,
                    disabled: !dirty || typedTrialName.value !== trialInput.input.name,  // Replaced propTrialName
                    onAction: submit,
                    icon: DeleteMinor,
                    loading: submitting
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        icon: CancelMinor,
                        onAction: toggleModal,
                    },
                ]}
            >
                <form onSubmit={submit}>
                    <Modal.Section>
                        <BlockStack>
                            <Text as='legend' variant='bodyLg' fontWeight='regular' color='warning'>
                                Are you sure you want to delete the trial plan <Text as='span' variant='bodyMd' fontWeight='bold' color='critical'>{`"${trialInput.input.name}"`}</Text>? This can't be undone.
                            </Text>
                            <Text as='p' variant='bodyLg' fontWeight='bold'>
                                Confirm by typing: <Badge status='attention'>{trialInput.input.name}</Badge>
                            </Text>
                            <TextField
                                value={typedTrialName.value}
                                onChange={(value) => typedTrialName.onChange(capitalizeFirstLetter(value))}
                                placeholder={`Type '${trialInput.input.name}' to confirm`}
                                helpText="Exact name required for confirmation."
                                error={errorMessage}
                            />
                        </BlockStack>
                    </Modal.Section>
                </form>
            </Modal>
        </div>
    );
}