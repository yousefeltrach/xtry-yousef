import {Button, Popover,Icon, ActionList} from '@shopify/polaris';
import {ArchiveMinor, DuplicateMinor,CancelMajor, MobileHorizontalDotsMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export default function ActionButton() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button variant="plain" onClick={toggleActive} >
       <Icon source={MobileHorizontalDotsMajor} tone="base"/>
    </Button>
  );

  return (
   
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            // {content: 'Duplicate', icon: DuplicateMinor},
            // {content: 'Archive', icon: ArchiveMinor},
            {content: 'Dismiss', icon: CancelMajor},
          ]}
        />
      </Popover>
    
  );
}