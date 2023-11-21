import React from 'react';
import { Page, Card, ButtonGroup, Button, Text,InlineStack } from '@shopify/polaris';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '12:00 AM', value: 0 },
  { name: '5:00 AM', value: 0 },
  { name: '10:00 AM', value: 0 },
  { name: '3:00 PM', value: 0 },
  { name: '8:00 PM', value: 0 },
  { name: '9:00 PM', value: 0 },
  // Add more data points as needed
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
        <p>{payload[0].payload.name}</p>
        <p>{`Value : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Dasboard()  {
  return (
    <Page>
    
        <ResponsiveContainer width="110%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: 50, bottom: 5, }}>
            <XAxis dataKey="name" />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              ticks={[0, 5, 10]}
              domain={[0, 'dataMax']}
              orientation="left"
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#007ace" activeDot={{ r: 8 }} isAnimationActive={false} dot={false} strokeWidth={2} />

            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" horizontal={false} vertical={false} />
          </LineChart>
        </ResponsiveContainer>
        <InlineStack align='end' >
          <ButtonGroup>
            <Button Button variant="plain"  onMouseOver={e => e.currentTarget.style.color = "#5c6ac4"} onMouseOut={e => e.currentTarget.style.color = "#212b36"}>
              <Text variation="strong">Nov 4, 2023</Text>
            </Button>
            <Button variant="plain"  onMouseOver={e => e.currentTarget.style.color = "#5c6ac4"} onMouseOut={e => e.currentTarget.style.color = "#212b36"}>
              <Text variation="strong">Nov 3, 2023</Text>
            </Button>
          </ButtonGroup>
        </InlineStack>
      
    </Page>
  );
};
