import React from 'react'
import {
  Text,
  Button,
  Icon,
  Page
} from '@shopify/polaris';
import {
  OrdersMajor
} from '@shopify/polaris-icons';
import DetailToggle from './DetailToggle';

export default function Details() {
  return (
    <div>

      <Text fontWeight="bold">
        Things to do next
      </Text>
      <br />

      <Button >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ margin: 0, marginRight: '10px' }}>
            <Icon
              source={OrdersMajor}
              tone="base"
            />
          </div>
          <Text> 8 orders to fulfill</Text>
        </div>
      </Button>
      <br />
      <DetailToggle />

    </div>
  );
}

