import {Icon, Select} from '@shopify/polaris';
import {CircleCancelMajor, StatusActiveMajor} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

export default function TrialPlanStatus(selectedStatusValue) {
  const [selected, setSelected] = useState(selectedStatusValue);

  const handleSelectedStatusChange = useCallback((value) => {
    setSelected(value); 
  }, []);

  const options = [
    {
      label: 'Draft',
      value: 'Draft',
      prefix: <Icon source={CircleCancelMajor} color='subdued' />,
    },
    {
      label: 'Active',
      value: 'Active',
      prefix: <Icon source={StatusActiveMajor} color='success'/>,
    },
  ];

  return (
    <Select
      options={options}
      onChange={handleSelectedStatusChange}
      value={selected}
    />
  );
}