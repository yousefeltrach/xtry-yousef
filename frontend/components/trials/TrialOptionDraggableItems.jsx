import React, { useState, useCallback } from "react";
import {
    Card,
    ResourceItem,
    Icon,
    Tooltip,
    Text,
    Badge,
    BlockStack,
    InlineStack,
    Button,
} from "@shopify/polaris";
import { useToast } from "@shopify/app-bridge-react";

import { DragHandleMinor, DeleteMinor, AddMajor, EditMinor, CirclePlusMajor, BehaviorMajor, PopularMajor } from "@shopify/polaris-icons";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import { StrictModeDroppable } from "./StrictModeDroppable.jsx";
import TrialOptionModal from './TrialOptionModal.jsx';
import TrialOptionEmptyState from './TrialOptionEmptyState.jsx';


function ListItem(props) {
    const {
        id,
        index,
        optionName,
        trialPeriodNumberOfDays,
        trialPeriodStartTime,
        chargeRemainingBalanceDaysAfterCheckout,
        depositAmount,
        adjustmentAmount,
        handleRemoveOption,
        handleEditOption,
        position,
        spOptions,
        setAsPopular,
        isPopular,
    } = props;

    const shortcutActions = [
        isPopular
            ? null // If the item is already popular, don't show the "Set as popular" button
            : {
                content: 'Set as popular',
                icon: BehaviorMajor,
                plain: true,
                onAction: () => setAsPopular(id)
            },
        {
            content: 'Edit',
            icon: EditMinor,
            plain: true,
            onAction: () => handleEditOption(id)
        },
        {
            content: 'Remove',
            icon: DeleteMinor,
            plain: true,
            destructive: true,
            onAction: () => handleRemoveOption(id)
        },
    ].filter(Boolean); // This filter removes any null values resulting from the ternary operation

    // Determine the container style based on whether the option is popular or not
    const containerStyle = {
        display: 'flex',
        alignItems: 'center', // This will align items vertically
        gap: 'var(--p-space-2)', // Adjust the gap as needed, using Polaris spacing tokens
    };


    return (
        <Draggable draggableId={id} index={position}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={
                            snapshot.isDragging
                                ? { background: "white", ...provided.draggableProps.style }
                                : provided.draggableProps.style
                        }
                    >
                        <ResourceItem
                            id={id}
                            key={id}
                            persistActions
                            verticalAlignment="fill"
                            shortcutActions={shortcutActions}>

                            <InlineStack blockAlign="start" align="start" gap={200}>
                                <BlockStack inlineAlign="start" gap={200}>
                                    <InlineStack blockAlign="start" gap={150}>
                                        <div {...provided.dragHandleProps}>
                                            <Tooltip content="Drag to reorder the position.">
                                                <Icon source={DragHandleMinor} tone="magic" />
                                            </Tooltip>
                                        </div>
                                        <Text as="p">
                                            <Badge tone="info">{trialPeriodNumberOfDays}</Badge> Days trial.
                                        </Text>
                                        <Text as="p">
                                            <Badge tone="info">{depositAmount}%</Badge> Deposit.
                                        </Text>
                                        <Text as="p">
                                            <Badge tone="info">{adjustmentAmount}%</Badge> Discount.
                                        </Text>
                                    </InlineStack>
                                </BlockStack>
                                <BlockStack inlineAlign="end" align="end" gap={100}>
                                    {isPopular && (
                                        <Badge tone="attention" icon={BehaviorMajor}>Popular</Badge>
                                    )}
                                </BlockStack>
                            </InlineStack>
                        </ResourceItem>
                    </div>
                );
            }}
        </Draggable>
    );
}

function List({ spOptions, onChange }) {

    const [items, setItems] = useState(spOptions);
    const [editedOption, setEditedOption] = useState(null);
    const toast = useToast();

    const [modalActive, setModalActive] = useState(false);
    // const toggleModal = () => setModalActive(!modalActive);
    const toggleModal = () => {
        // If modal is currently active (meaning this call is going to close it)
        if (modalActive) {
            setEditedOption(null);  // Reset editedOption when closing the modal
        }
        setModalActive(prevState => !prevState);  // Toggle modal state
    };

    const handleRemoveOption = (idToRemove) => {
        setItems(oldItems => {
            const newItems = oldItems.filter(item => item.id !== idToRemove);
            onChange(newItems);
            console.log({ "After remove option:": newItems });
            return newItems;
        });
        toast.show(`Option removed successfully.`);
    };

    const addOption = useCallback((newItem) => {
        setItems((oldItems) => {
            const exists = oldItems.some((item) => item.optionName === newItem.optionName);
            if (exists) {
                toast.show(`Option already exists.`);
                return oldItems;
            }
    
            // If the new option is set as popular, unset the flag for all other options
            if (newItem.isPopular) {
                oldItems.forEach((item) => item.isPopular = false);
            }
    
            const index = oldItems.length;
            const newItems = [...oldItems, { ...newItem, position: index, isPopular: newItem.isPopular }];
            onChange(newItems);
            toast.show(`Option added successfully.`);
            return newItems;
        });
    }, [onChange, toast]);
    
    const updateOption = useCallback((updatedItem) => {
        setItems((oldItems) => {
            // If the updated option is set as popular, unset the flag for all other options
            if (updatedItem.isPopular) {
                oldItems = oldItems.map((item) => ({
                    ...item,
                    isPopular: item.id === updatedItem.id,
                }));
            }
    
            const newItems = oldItems.map((item) =>
                item.id === updatedItem.id ? { ...updatedItem, position: item.position } : item
            );
    
            onChange(newItems);
            toast.show(`Option updated successfully.`);
            return newItems;
        });
    
        setEditedOption(null);
    }, [onChange, toast]);
    

    const setAsPopular = useCallback((idToSet) => {
        setItems((oldItems) => {
            // Reset isPopular for all options and set true for the selected option
            const newItems = oldItems.map((item) => ({
                ...item,
                isPopular: item.id === idToSet,
            }));

            // Ensure only one item is set as popular
            const index = newItems.findIndex((item) => item.id === idToSet);
            if (index !== -1) {
                newItems.forEach((item, idx) => {
                    if (idx !== index) item.isPopular = false;
                });
            }

            onChange(newItems); // This should trigger the update in the parent state
            toast.show(`Popular option updated.`);
            return newItems;
        });
    }, [onChange, toast]);


    const handleEditOption = (idToEdit) => {
        const optionToEdit = items.find(item => item.id === idToEdit);
        setEditedOption(optionToEdit);
        toggleModal();
    };

    const handleDragEnd = useCallback(({ source, destination }) => {
        // If dropped outside of droppable, return
        if (!destination) {
            return;
        }

        setItems(oldItems => {
            const newItems = oldItems.slice();
            const [temp] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, temp);
            toast.show(`Position changed from ${source.index} to ${destination.index}.`);
            // Update the position field of each item based on its new index
            newItems.forEach((item, index) => {
                item.position = index;
            });
            onChange(newItems);
            return newItems;
        });
    }, [onChange]);

    return (
        <>
            <Card>
                <BlockStack gap={100}>
                    <BlockStack align="start">
                        <Text as="h2" fontWeight="bold" variant="headingMd" alignment="start">Options</Text>
                    </BlockStack>

                    {items && items.length > 0 ? (
                        <>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <StrictModeDroppable droppableId="root">
                                    {provided => (
                                        <ul
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{ listStyleType: 'none' }}
                                        >
                                            {items.map((item, index) => (
                                                <ListItem
                                                    key={item.id}
                                                    id={item.id}
                                                    index={index}
                                                    position={index}
                                                    optionName={item.optionName}
                                                    trialPeriodNumberOfDays={item.trialPeriodNumberOfDays}
                                                    trialPeriodStartTime={item.trialPeriodStartTime}
                                                    chargeRemainingBalanceDaysAfterCheckout={item.chargeRemainingBalanceDaysAfterCheckout}
                                                    depositAmount={item.depositAmount}
                                                    adjustmentAmount={item.adjustmentAmount}
                                                    handleRemoveOption={handleRemoveOption}
                                                    handleEditOption={handleEditOption}
                                                    spOptions={spOptions}
                                                    setAsPopular={setAsPopular}
                                                    isPopular={item.isPopular}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </StrictModeDroppable>
                            </DragDropContext>
                            <BlockStack inlineAlign="end">
                                <Button icon={CirclePlusMajor} variant="primary" onClick={toggleModal}>Add option</Button>
                            </BlockStack>
                        </>
                    ) : (
                        <BlockStack align="center" inlineAlign="center">
                            <TrialOptionEmptyState toggleModal={toggleModal} />
                        </BlockStack>
                    )}
                </BlockStack>
            </Card >
            {modalActive && (
                console.log(spOptions),
                <TrialOptionModal
                    spOptions={spOptions}
                    toggleModal={toggleModal}
                    addOption={addOption}
                    editedOption={editedOption}
                    updateOption={updateOption}
                />
            )
            }
        </>
    );
}

export default function TrialOptionDraggableItems({ spOptions, onChange }) {
    console.log(spOptions);
    return (
        <List spOptions={spOptions} onChange={onChange} />
    );
}
