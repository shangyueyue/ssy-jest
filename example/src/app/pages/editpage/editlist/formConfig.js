import { FormattedMessage } from 'react-intl';
import { Select } from '@alifd/next';

function T(id) {
  return (<FormattedMessage id={id} />);
}

export default function fromConfigfn() {
  return [
    {
      label: T('Category'),
      name: 'Category',
      component: Select,
      dataSource: [
        { label: 'option1', value: 'option1' },
        { label: 'option2', value: 'option2' },
      ],
    },
  ];
}
