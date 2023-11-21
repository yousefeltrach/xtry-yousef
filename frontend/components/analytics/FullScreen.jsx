import React, { useState, useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import {
  Box,
  Button,
  Text,
  Checkbox
} from '@shopify/polaris';

import {
  MaximizeMajor,
  MinimizeMinor,
} from '@shopify/polaris-icons';

export default function X() {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const [fullMode, setFullMode] = useState(false);

  const unsubscribeEnter = () => {
    fullscreen.dispatch(Fullscreen.Action.ENTER);
    setFullMode(true)
  };
  const unsubscribeExit = () => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
    setFullMode(false)
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text variant="headingXl" as="h4">Analytics</Text>

      <Box>
        {!fullMode &&
          <Button icon={MaximizeMajor} color="base" onClick={unsubscribeEnter}>
            Fullscreen
          </Button>
        }
        {fullMode && <Button icon={MinimizeMinor} color="base" onClick={unsubscribeExit}>
          Minimize
        </Button>}
      </Box>
    </div>
  )
}
