import { BlockStack, Page, Text, Layout ,Card } from '@shopify/polaris'
import React from 'react'
import CollapsibleDashboard from '../components/dashboard/CollapsibleDashboard'
import Actions from '../components/actions/Actions'




export default function Dashboard() {
  return (
    <Page  title='Home'>
                     
        <Actions/>
        <CollapsibleDashboard/>

    </Page>
  )
}