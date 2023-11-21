import React, { useState, useCallback } from 'react';
import { Page, Button, Text, InlineStack,  } from '@shopify/polaris';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ViewReportButton from './ViewReportButton'


const data = [
    { name: '12:00 AM', value: 0 },
    { name: '5:00 AM', value: 0 },
    { name: '10:00 AM', value: 0 },
    { name: '3:00 PM', value: 0 },
    { name: '8:00 PM', value: 0 },
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

const buttonStyle = {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
};

export default function Dashboardd() {
    const [selectedSection, setSelectedSection] = useState('session');

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const renderButton = (section, label) => (
        <Button
            fullWidth
            variant="tertiary"
            textAlign="start"
            onClick={() => handleSectionClick(section)}
        >
            <InlineStack vertical spacing="extraTight">
                <Text
                    variant="bodyLg"
                    className="border-dashed border-2 border-sky-500"
                    textDecorationLine="line"
                >
                    {label}
                </Text>
                <InlineStack spacing="none">
                    <Text variant="headingMd">0</Text>
                </InlineStack>
            </InlineStack>
        </Button>
    );
 return (
        // <div style={{width:'50rem', marginLeft:'-15px'}}>
        <Page>
            <InlineStack alignment="center" distribution="trailing" align='end'>
                <ViewReportButton />
            </InlineStack>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} dot={false} strokeWidth={2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" horizontal={false} vertical={false} />
                </LineChart>
            </ResponsiveContainer>

            <InlineStack gap="400" wrap={false} align='end'  >
                <Button Button variant="plain" onMouseOver={e => e.currentTarget.style.color = "#5c6ac4"} onMouseOut={e => e.currentTarget.style.color = "#212b36"}>
                    <Text variation="strong">Nov 4, 2023</Text>
                </Button>

                <Button Button variant="plain" onMouseOver={e => e.currentTarget.style.color = "#5c6ac4"} onMouseOut={e => e.currentTarget.style.color = "#212b36"}>
                    <Text variation="strong">Nov 3, 2023</Text>
                </Button>
            </InlineStack>
         </Page> 
        // </div>
    );
};

