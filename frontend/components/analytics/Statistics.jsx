import {Page, Grid, LegacyCard,Text,Tooltip} from '@shopify/polaris';
import React from 'react';
import ViewReportButton from '../dashboard/ViewReportButton';
import Conversion from './Conversion';
import Dashboard from './MiniDashboard.jsx';




export default function Statistics() {
  return (
    <Page fullWidth>
      {/* first line */}
    <Grid >
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 6, xl: 4 }}>
      
        <LegacyCard  sectioned >
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Total Sales</Text>
          </Tooltip>
         <ViewReportButton/>
       </div>
          
        <Text variant="headingMd">$0.00 -</Text>
        <div style={{width:'500px', alignContent:'flex-start', marginLeft:'-80px'}}>
        <Dashboard/>
        </div>
        </LegacyCard>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 6, xl: 4 }}>
        <LegacyCard sectioned>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Sales by channel</Text>
        </Tooltip>  
         <ViewReportButton/>
       </div>
        <Text variant="headingMd">0 -</Text>
        <Conversion/>
        </LegacyCard>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 6, xl: 4 }}>
        <LegacyCard  sectioned>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Online store sessions</Text>
        </Tooltip>
         <ViewReportButton/>
       </div>
        <Text variant="headingMd">0 -</Text>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
    <br/>
    {/* second line */}
    {/* <Grid>
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
      
        <LegacyCard  sectioned >
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Online store conversion rate</Text>
        </Tooltip>
        <ViewReportButton/>
       </div>
          
        <Text variant="headingMd">0% -</Text>
      
        </LegacyCard>
      </Grid.Cell>
     
      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
        <LegacyCard sectioned>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Total orders</Text>
        </Tooltip>
         <ViewReportButton/>
       </div>
        <Text variant="headingMd">0 -</Text>
        </LegacyCard>
      </Grid.Cell>

      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
        <LegacyCard  sectioned>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <Tooltip content="This order has shipping labels." dismissOnMouseOut>
          <Text>Average order value</Text>
        </Tooltip>
         <ViewReportButton/>
       </div>
        <Text variant="headingMd">$0.00 -</Text>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
    <br/>
    */}
    
    
  </Page>
  )
}  