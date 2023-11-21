import { Banner, Text } from '@shopify/polaris';

export default function TrialPlanFetchningError() {

    return (
        <Banner
            title="There was an error"
            tone="critical" 
            onDismiss={() => {
                // Optional dismiss handler
            }}
        >
            <Text as='p' alignment='justify' fontWeight='medium' tone='critical' variant='bodyMd'>
                There was an issue loading your trial plan. Please try again.
            </Text>
        </Banner>
    );

}

