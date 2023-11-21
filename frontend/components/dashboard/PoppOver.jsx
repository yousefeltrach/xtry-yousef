import React, { useState, useCallback } from 'react';
import {
  Button,
  InlineStack,
  Popover as PolarisPopover,
  OptionList as PolarisOptionList,
} from '@shopify/polaris';

export default function PoppOver() {
  const [selectedToday, setSelectedToday] = useState('Today');
  const [selectedChannels, setSelectedChannels] = useState('All channels');
  const [todayPopoverActive, setTodayPopoverActive] = useState(false);
  const [channelsPopoverActive, setChannelsPopoverActive] = useState(false);

  const toggleTodayPopoverActive = useCallback(
    () => setTodayPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const toggleChannelsPopoverActive = useCallback(
    () => setChannelsPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const todayButtonActivator = (
    <Button onClick={toggleTodayPopoverActive} disclosure>
      {selectedToday}
    </Button>
  );

  const channelsButtonActivator = (
    <Button onClick={toggleChannelsPopoverActive} disclosure>
      {selectedChannels}
    </Button>
  );

  return (
    <div>
      <InlineStack  align='space-between' >
        <InlineStack gap="400">
        <PolarisPopover
          active={todayPopoverActive}
          activator={todayButtonActivator}
          onClose={toggleTodayPopoverActive}
        >
          <PolarisOptionList
            onChange={(newSelected) => {
              setSelectedToday(newSelected);
              toggleTodayPopoverActive();
            }}
            options={[
              { value: 'Today', label: 'Today' },
              { value: 'Yesterday', label: 'Yesterday' },
              { value: 'Week to date', label: 'Week to Date' },
              { value: 'Month to date', label: 'Month to Date' },
              { value: 'Year to date', label: 'Year to Date' },
            ]}
            selected={selectedToday}
          />
        </PolarisPopover>
    
     
        <PolarisPopover
          active={channelsPopoverActive}
          activator={channelsButtonActivator}
          onClose={toggleChannelsPopoverActive}
        >
          <PolarisOptionList
            onChange={(newSelected) => {
              setSelectedChannels(newSelected);
              toggleChannelsPopoverActive();
            }}
            options={[
              { value: 'All channels', label: 'All channels' },
              { value: 'Online Store', label: 'Online Store' },
              { value: 'Shopify GraphQL App', label: 'Shopify GraphQL App' },
              { value: 'Xtry staging', label: 'Xtry staging' },
              { value: 'Other', label: 'Other' },
            ]}
            selected={selectedChannels}
          />
        </PolarisPopover>
        </InlineStack>
         
          <InlineStack align="end" >
            <Button>Next payout: $0:00</Button>
          </InlineStack>

      </InlineStack >
    </div>

  );
}
