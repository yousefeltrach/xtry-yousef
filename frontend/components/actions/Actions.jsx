import React from 'react'
import { Banner, Card, Button, Link, List, Page } from '@shopify/polaris';

class Actions extends React.Component {
    state = {
        actionsNeeded: [
            // Array of actions the merchant needs to take
            { message: "Add product details for 'XYZ'.", link: '/add-product-xyz' },
            // ... more actions
        ],
        allActionsCompleted: true, // Set this to false if actions are needed, true if no actions are needed
    };

    render() {
        const { actionsNeeded, allActionsCompleted } = this.state;
        const hasActions = actionsNeeded.length > 0;

        return (
            <Page>
                {/* When all actions are completed, show the success banner */}
                {allActionsCompleted && (
                    <Banner
                        title="All set up!"
                        tone="success"
                        action={{ content: 'Refresh', onAction: this.handleRefresh }}
                        onDismiss={() => {}}
                    >
                        <p>You have completed all the necessary setup actions.</p>
                    </Banner>
                )}

                {/* If there are actions to do, show the warning banner */}
                {!allActionsCompleted && hasActions && (
                    <Banner
                        title="Action Required"
                        tone="warning"
                        onDismiss={() => {}}
                    >
                        {actionsNeeded.map((action, index) => (
                            <List key={index}>
                                <List.Item>
                                    <div style={{ marginBottom: '8px' }}>
                                        <p>{action.message}</p>
                                        <Button plain url={action.link}>
                                            Complete this step
                                        </Button>
                                    </div>
                                </List.Item>
                            </List>
                        ))}
                    </Banner>
                )}
            </Page>
        );
    }

    handleRefresh = () => {
        // Logic to refresh the merchant's action status
        window.location.reload();
    };
}

export default Actions;
