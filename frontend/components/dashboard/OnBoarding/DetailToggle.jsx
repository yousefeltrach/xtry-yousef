import React, { useState, useCallback } from 'react';
import { Card, Button,Layout, Collapsible, ProgressBar, InlineStack, TextContainer, Text, Page, Icon, BlockStack } from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor, MobileHorizontalDotsMajor } from '@shopify/polaris-icons';
import SetupGuide from './SetupGuide';
import ActionButton from './ActionButton';

export default function DetailsToggle() {
    const [open, setOpen] = useState(true);
    const handleToggle = useCallback(() => setOpen((open) => !open), []);

    const [active, setActive] = useState(true);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const [progress, setProgress] = useState(0);

    const updateProgress = (checkedSections) => {
        const completedSections = Object.values(checkedSections).filter(Boolean).length;
        setProgress(completedSections);
    };

    const activator = (
        <Button variant="plain" onClick={toggleActive}>
            <Icon source={MobileHorizontalDotsMajor} tone="base" />
        </Button>
    );

    return (
        // <div style={{width:'51rem'}}>
        <div>
            <br />
            <Card >
                <InlineStack align="space-between">
                    <Text variant="heading2xl" as="h2">Setup guide</Text>
                    <InlineStack gap="400" align='center'>
                        <div style={{ marginTop: '16px' }}>
                            <ActionButton />
                        </div>
                         <Button
                            onClick={handleToggle}
                            aria-expanded={open}
                            aria-controls="basic-collapsible"
                            size="slim"
                            variant="plain"
                            icon={open ? <ChevronUpMinor /> : <ChevronDownMinor />}
                        >
                            {open ? (
                                <ChevronUpMinor style={{ width: '20px', height: '20px' }} />
                            ) : (
                                <ChevronDownMinor style={{ width: '20px', height: '20px' }} />
                            )}
                        </Button>
                    </InlineStack>
                </InlineStack>
                <Text variation="subdued">
                    Use this personalized guide to get your store up and running.
                </Text>
                <BlockStack>
                    <p style={{ margin: 0, marginRight: '10px' }}>{progress} / 4 completed</p>
                    <div style={{ width: 225, marginTop: '5px' }}>
                        <ProgressBar progress={(progress / 4) * 100} tone="primary" />
                    </div>
                    <Collapsible
                        open={open}
                        id="basic-collapsible"
                        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                        expandOnPrint
                    >
                        <Text>
                            <SetupGuide updateProgress={updateProgress} />
                        </Text>
                    </Collapsible>
                </BlockStack>
            </Card>
        </div>   
        // </div>
    );
}

