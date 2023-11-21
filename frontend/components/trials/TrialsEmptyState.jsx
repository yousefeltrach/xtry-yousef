import {EmptyState, Link} from '@shopify/polaris';
import { useNavigate } from "@shopify/app-bridge-react";

import React from 'react';
import { CirclePlusMajor, InfoMinor } from '@shopify/polaris-icons';

export default function TrialPlansEmptyState() {

    const navigate = useNavigate();

  return (
      <EmptyState
        heading="Create and manage trial plans."
        action={
            {
                content: 'Create new plan',
                icon: CirclePlusMajor,
                onAction: () => navigate("/trials/new"),
            }
        }
        secondaryAction={{
          content: 'Learn more',
          icon: InfoMinor,
          url: '#',
        }}
        footerContent={
          <p>
            How it works? check our
            {' '}
            <Link monochrome url="#">
            documentation
            </Link>
            .
          </p>
        }
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Let your customers experience your products before they purchase.</p>
      </EmptyState>
  );
}