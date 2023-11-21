import React from 'react';
import {
  AppProvider,
  Page,
  Card,
  ResourceList,
  Text,
} from '@shopify/polaris';

export default function Conversion() {
  return (
<AppProvider>
       <ResourceList.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Text variation="strong">Added to cart</Text>
                    <span>0 Session</span>
                </div>
                <div>              
                    <Text variation="headingMd">$0.00 -</Text>
                </div> 
            </div>
        </ResourceList.Item>
       <ResourceList.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Text variation="strong">Reached checkout</Text>
                    <span>0 Session</span>
                </div>
                <div>              
                    <Text variation="headingMd">$0.00 -</Text>
                </div> 
            </div>
        </ResourceList.Item>
       <ResourceList.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Text variation="strong">Sessions converted</Text>
                    <span>0 Session</span>
                </div>
                <div>              
                    <Text variation="headingMd">$0.00 -</Text>
                </div> 
            </div>
        </ResourceList.Item>
       <ResourceList.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Text variation="strong">Sessions converted</Text>
                    <span>0 Session</span>
                </div>
                <div>              
                    <Text variation="headingMd">$0.00 -</Text>
                </div> 
            </div>
        </ResourceList.Item>
     
</AppProvider> 

  );
}
