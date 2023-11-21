import { useFindFirst, useFindMany, useQuery } from "@gadgetinc/react";
import { Card, Banner, FooterHelp, InlineStack, Icon, Layout, Link, Page, Spinner, Text, Pagination, Select, BlockStack } from "@shopify/polaris";
import { api } from "../api";
import { AddMajor, CirclePlusMajor } from "@shopify/polaris-icons";
import { useNavigate } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import TrialsIndexTable from "../components/trials/TrialsIndexTable";


export default function Trials() {
    const navigate = useNavigate();
    /**
    * CHANGE NUM_RECORDS TO MODIFY THE NUMBER OF RECORDS FETCHED AT A SINGLE TIME
    */
    const NUM_RECORDS = 10;
    // Add state for rows per page
    const [rowsPerPage, setRowsPerPage] = useState(NUM_RECORDS);


    // React state to manage table data and settings, as well as pagination cursor
    const [trialPlans, setTrialPlans] = useState([]);
    const [cursor, setCursor] = useState({ first: rowsPerPage });

    /**
     * CHANGE shopifyShop TO YOUR GADGET MODEL'S API IDENTIFIER TO FETCH DIFFERENT DATA
     */
    const [{ data, fetching, error }, refresh] = useFindMany(api.trialPlan, {
        ...cursor,
        select: {
            id: true,
            sellingPlanGroupId: true,
            name: true,
            planTitle: true,
            description: true,
            trialPeriodSummary: true,
            depositSummary: true,
            discountSummary: true,
            chargeBalanceSummary: true,
            deliveryPolicy: true,
            inventoryPolicy: true,
            // productIds: true,
            // productVariantsIds: true,
            trialPlanOptions: {
                edges: {
                    node: {
                        _all: true,
                    }
                }
            },
            trialProducts: {
                edges: {
                    node: {
                        _all: true,
                    }
                }
            },
            trialProductVariants: {
                edges: {
                    node: {
                        _all: true,
                    }
                }
            },
        },
        live: true,
    });

    // Update the cursor when rowsPerPage changes
    useEffect(() => {
        setCursor({ first: rowsPerPage });
    }, [rowsPerPage]);

    const handleRowsPerPageChange = useCallback((value) => {
        setRowsPerPage(parseInt(value));
    }, []);

    useEffect(() => {
        if (data) {
            // transform the data to match the structure of "trialPlans"
            let transformedData = data.map(d => ({
                id: d.id,
                trialPlanName: d.name,
                planTitle: d.planTitle,
                description: d.description,
                trialPeriodSummary: d.trialPeriodSummary,
                depositSummary: d.depositSummary,
                discountSummary: d.discountSummary,
                chargeBalanceSummary: d.chargeBalanceSummary,
                deliveryPolicy: d.deliveryPolicy,
                inventoryPolicy: d.inventoryPolicy,
                // productIds: d.productIds,
                // productVariantsIds: d.productVariantsIds,
                trialPlanOptions: d.trialPlanOptions.edges.map(edge => edge.node),
                trialProducts: d.trialProducts.edges.map(edge => edge.node),
                trialProductVariants: d.trialProductVariants.edges.map(edge => edge.node),
            }));

            // set transformed data to trialPlans
            setTrialPlans(transformedData);
            console.log(transformedData);
        }
    }, [data]);

    // update the pagination functions to use Polaris's Pagination component
    const handleNextPage = useCallback(() => {
        // use first + after to page forwards
        setCursor({ first: rowsPerPage, after: data.endCursor });
    }, [data]);

    const handlePreviousPage = useCallback(() => {
        // use last + before to page backwards
        setCursor({ last: rowsPerPage, before: data.startCursor });
    }, [data]);

    // display any request errors
    if (error) {
        return (
            <Page title="Error">
                <Text variant="bodyMd" as="p">
                    Error: {error.toString()}
                </Text>
            </Page>
        );
    }

    return (
        <Page
            title="Trial plans"
            fullWidth
            primaryAction={
                {
                    content: "Create new plan",
                    icon: CirclePlusMajor,
                    primary: true,
                    onAction: () => navigate("/trials/new")
                }
            }
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap={300}>

                        {data && (
                            <TrialsIndexTable trialPlans={trialPlans} isLoading={fetching} />
                        )}
                        {data && trialPlans.length > 0 && (
                            <>
                                <InlineStack align="end" blockAlign="end" gap={100}>
                                    {/* <InlineStack align="end"> */}
                                        <Select
                                            label="Plans per page:"
                                            labelInline
                                            options={['10', '20', '50', '100']}
                                            value={String(rowsPerPage)}
                                            onChange={handleRowsPerPageChange}
                                        />
                                        <Pagination
                                            hasPrevious={data?.hasPreviousPage}
                                            onPrevious={handlePreviousPage}
                                            hasNext={data?.hasNextPage}
                                            onNext={handleNextPage}
                                        />
                                    {/* </InlineStack> */}
                                </InlineStack>
                            </>
                        )}
                        </BlockStack>
                    </Card>
                </Layout.Section>

                <Layout.Section>
                    <FooterHelp>
                        <p>
                            Powered by{" "}
                            <Link>
                                DevOps Crowd
                            </Link>
                        </p>
                    </FooterHelp>
                </Layout.Section>
            </Layout>
        </Page>
    );
};