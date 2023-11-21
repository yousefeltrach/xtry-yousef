import { useState } from 'react';
import { Tooltip, Button, Collapsible, CalloutCard, BlockStack, Icon, Page } from '@shopify/polaris';
import { CircleTickMajor, CirclePlusMajor } from '@shopify/polaris-icons';



export default function SetupGuide({ updateProgress }) {
    const [openSection, setOpenSection] = useState('firstProduct');
    const [checkedSections, setCheckedSections] = useState({});

    const handleIconClick = (section) => {
        // Toggle the "done" state for the clicked section.
        setCheckedSections((prev) => {
            const newCheckedSections = {
                ...prev,
                [section]: !prev[section],
            };
            // Update the progress in the parent component.
            updateProgress(newCheckedSections);
            return newCheckedSections;
        });
    };

    const renderCalloutCard = (title, illustration, primaryActionText, secondaryActionText, description) => (
        <CalloutCard
            title={title}
            illustration={illustration}
            primaryAction={{ content: primaryActionText }}
            secondaryAction={{ content: secondaryActionText }}
        >
            <p>{description}</p>
        </CalloutCard>
    );

    const renderTooltipIcon = (section) => (
        <Tooltip content={checkedSections[section] ? 'Mark as not done' : 'Mark as done'}>
            <Button onClick={() => handleIconClick(section)} variant="tertiary">
                <Icon source={checkedSections[section] ? CircleTickMajor : CirclePlusMajor} color="base" />
                
            </Button>
        </Tooltip>
    );

    return (
        <Page>
        {/* <div style={{ width: '49rem' , marginBottom:'10px' , marginTop:'10px'}}> */}
            <BlockStack alignment="stretch" gap={200} >
                {/* Add your first product */}
                <Button
                    icon={renderTooltipIcon('firstProduct')}
                    onClick={() => handleToggle('firstProduct')}
                    ariaExpanded={openSection === 'firstProduct'}
                    ariaControls="first-product-collapsible"
                    fullWidth
                    textAlign="start"
                    plain
                >
                    Add your first product
                </Button>
                <Collapsible
                    open={openSection === 'firstProduct'}
                    id="first-product-collapsible"
                >
                    {renderCalloutCard(
                        'Add your first product',
                        'illustrationURL1', // Replace with actual URL
                        'Customize product',
                        'Learn more',
                        'Upload your products and start selling.'
                    )}
                </Collapsible>

                {/* Customize your online store */}
                <Button
                    icon={renderTooltipIcon('customizeStore')}
                    onClick={() => handleToggle('customizeStore')}
                    ariaExpanded={openSection === 'customizeStore'}
                    ariaControls="customize-store-collapsible"
                    fullWidth
                    textAlign="start"
                    plain
                >
                    Customize your online store
                </Button>
                <Collapsible
                    open={openSection === 'customizeStore'}
                    id="customize-store-collapsible"
                >
                    {renderCalloutCard(
                        'Customize your online store',
                        'illustrationURL2', // Replace with actual URL
                        'Customize store',
                        'Learn about customization',
                        'Change the look and feel of your store.'
                    )}
                </Collapsible>

                {/* Add a custom domain */}
                <Button
                    icon={renderTooltipIcon('customDomain')}
                    onClick={() => handleToggle('customDomain')}
                    ariaExpanded={openSection === 'customDomain'}
                    ariaControls="custom-domain-collapsible"
                    fullWidth
                    textAlign="start"
                    plain
                >
                    Add a custom domain
                </Button>
                <Collapsible
                    open={openSection === 'customDomain'}
                    id="custom-domain-collapsible"
                >
                    {renderCalloutCard(
                        'Add a custom domain',
                        'illustrationURL3', // Replace with actual URL
                        'Set up domain',
                        'Domain help',
                        'Personalize your store URL with a custom domain.'
                    )}
                </Collapsible>

                {/* Set up Shopify Payments */}
                <Button
                    icon={renderTooltipIcon('shopifyPayments')}
                    onClick={() => handleToggle('shopifyPayments')}
                    ariaExpanded={openSection === 'shopifyPayments'}
                    ariaControls="shopify-payments-collapsible"
                    fullWidth
                    textAlign="start"
                    plain
                >
                    Set up Shopify Payments
                </Button>
                <Collapsible
                    open={openSection === 'shopifyPayments'}
                    id="shopify-payments-collapsible"
                >
                    {renderCalloutCard(
                        'Set up Shopify Payments',
                        'illustrationURL4', // Replace with actual URL
                        'Configure payments',
                        'Payment information',
                        'Set up your payment gateway to start accepting payments.'
                    )}
                </Collapsible>
            </BlockStack>
        {/* </div> */}
        </Page>
    );
}


// import { useState } from 'react';
// import { Tooltip, Button, Collapsible, CalloutCard, BlockStack, Icon, Page } from '@shopify/polaris';
// import { CircleTickMajor, CirclePlusMajor } from '@shopify/polaris-icons';
// import { api } from "../../../api";
// import { useFindMany } from "@gadgetinc/react";

// export default function SetupGuide({ updateProgress }) {
//   const [openSection, setOpenSection] = useState('firstProduct');
//   const [checkedSections, setCheckedSections] = useState({});
  
//   const handleIconClick = (section) => {
//     setCheckedSections((prev) => {
//       const newCheckedSections = {
//         ...prev,
//         [section]: !prev[section],
//       };
//       updateProgress(newCheckedSections);
//       return newCheckedSections;
//     });
//   };

//   const handleToggle = (section) => {
//     setOpenSection((prevSection) => prevSection === section ? null : section);
//   };

//   const [{ data, fetching, error }] = useFindMany(api.onboarding, {
//     select: {
//       id: true,
//       task: true,
//       description: true,
//       status: true,
//     }
//   });

//   if (fetching) {
//     return <Page><div>Loading...</div></Page>;
//   }

//   if (error) {
//     return <Page><div>Error fetching data: {error.message}</div></Page>;
//   }

//   const renderCalloutCard = (title, illustration, primaryActionText, secondaryActionText, description) => (
//     <CalloutCard
//       title={title}
//       illustration={illustration}
//       primaryAction={{ content: primaryActionText }}
//       secondaryAction={{ content: secondaryActionText }}
//     >
//       <p>{description}</p>
//     </CalloutCard>
//   );

//   const renderTooltipIcon = (section) => (
//     <Tooltip content={checkedSections[section] ? 'Mark as not done' : 'Mark as done'}>
//       <Button onClick={() => handleIconClick(section)} plain>
//         <Icon source={checkedSections[section] ? CircleTickMajor : CirclePlusMajor} color="base" />
//       </Button>
//     </Tooltip>
//   );

//   // Example URL for illustration, replace with actual URLs
//   const illustrationUrls = {
//     firstProduct: 'illustrationURL1',
//     customizeStore: 'illustrationURL2',
//     customDomain: 'illustrationURL3',
//     shopifyPayments: 'illustrationURL4'
//   };

//   const taskSections = data?.map((task) => (
//     <React.Fragment key={task.id}>
//       <Button
//         icon={renderTooltipIcon(task.task)}
//         onClick={() => handleToggle(task.task)}
//         ariaExpanded={openSection === task.task}
//         ariaControls={`${task.task}-collapsible`}
//         fullWidth
//         textAlign="start"
//         plain
//       >
//         {task.task}
//       </Button>
//       <Collapsible
//         open={openSection === task.task}
//         id={`${task.task}-collapsible`}
//       >
//         {renderCalloutCard(
//           task.task,
//           illustrationUrls[task.task], // Replace with actual URL
//           'Learn more',
//           'Details',
//           task.description
//         )}
//       </Collapsible>
//     </React.Fragment>
//   ));

//   return (
//     <Page>
//       <BlockStack alignment="stretch" gap={200}>
//         {taskSections}
//       </BlockStack>
//     </Page>
//   );
// }
