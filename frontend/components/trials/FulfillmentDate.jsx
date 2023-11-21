import { BlockStack, Box, DatePicker, Icon, Card, Popover, TextField } from '@shopify/polaris';
import { useState, useRef, useEffect } from 'react';
import {
  CalendarMinor
} from '@shopify/polaris-icons';

export default function FulfillmentDate({ fulfillmentDate, onChange }) {

  function nodeContainsDescendant(rootNode, descendant) {
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }
  
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(fulfillmentDate);
  
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const [formattedValue, setFormattedValue] = useState(fulfillmentDate.toISOString().slice(0, 10));

  useEffect(() => {
    setFormattedValue(fulfillmentDate.toISOString().slice(0, 10));
    setDate({
      month: fulfillmentDate.getMonth(),
      year: fulfillmentDate.getFullYear(),
    });
  }, [fulfillmentDate]);

  const datePickerRef = useRef(null);
  const today = new Date();
  function isNodeWithinPopover(node) {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }
  function handleOnClose({ relatedTarget }) {
    setVisible(false);
  }
  function handleMonthChange(month, year) {
    setDate({ month, year });
  }
  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate);
    setVisible(false);
    onChange(newSelectedDate); // Pass the selected date back to the parent component
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);

  function handleInputValueChange(dateString) {
    const newSelectedDate = new Date(dateString);
    if (newSelectedDate > today) {
      setSelectedDate(newSelectedDate);
      onChange(newSelectedDate); // Pass the selected date back to the parent component
    }
  }

  return (
    <Card>
      <BlockStack align="start" gap="4">
        <Box minWidth="276px" padding={{ xs: 2 }}>
          <Popover
            active={visible}
            autofocusTarget="none"
            preferredAlignment="left"
            fullWidth
            preferInputActivator={false}
            preferredPosition="below"
            preventCloseOnChildOverlayClick
            onClose={handleOnClose}
            activator={
              <TextField
                role="combobox"
                label={"Fulfill on"}
                prefix={<Icon source={CalendarMinor} />}
                value={formattedValue}
                onFocus={() => setVisible(true)}
                onChange={handleInputValueChange}
                autoComplete="off"
                helpText="Expected date to deliver the product."
              />
            }
          >
            <Card>
              <DatePicker
                month={month}
                year={year}
                selected={fulfillmentDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
                disableDatesBefore={today}
                disableDatesAfter={new Date('2100-12-31')}
                allowRange={false}
              />
            </Card>
          </Popover>
        </Box>
      </BlockStack>
    </Card>
  )
}
