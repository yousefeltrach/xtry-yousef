import React from "react";
import {
    SkeletonPage,
    Layout,
    Card,
    SkeletonBodyText,
    SkeletonDisplayText,
    Text
} from "@shopify/polaris";

export default function SkeletonTabsLoading() {
    return (
        <SkeletonPage primaryAction>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <SkeletonBodyText />
                    </Card>
                    <Card sectioned>
                        <Text>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText />
                        </Text>
                    </Card>
                    <Card sectioned>
                        <Text>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText />
                        </Text>
                    </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                    <Card>
                        <Card.Section>
                            <Text>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2} />
                            </Text>
                        </Card.Section>
                        <Card.Section>
                            <SkeletonBodyText lines={1} />
                        </Card.Section>
                    </Card>
                    <Card subdued>
                        <Card.Section>
                            <Text>
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2} />
                            </Text>
                        </Card.Section>
                        <Card.Section>
                            <SkeletonBodyText lines={2} />
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );
};
