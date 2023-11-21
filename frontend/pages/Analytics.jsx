import { Page, Text } from '@shopify/polaris'
import React from 'react'
import Statistics from '../components/analytics/Statistics'
import FullScreen from "../components/analytics/FullScreen";
import DateRangePicker from "../components/analytics/DateRangePicker";


export default function Analytics() {
  return (
  
        <Page  fullWidth>
           
           <FullScreen/>
            <br/>
            <DateRangePicker/>
            <br/>
            <Statistics/>
            
        
         </Page>
 
  )
}