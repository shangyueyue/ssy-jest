import { FormattedMessage } from 'react-intl';
import { Select } from '@alifd/next';

/**
 * 打开注释，做多语言配置即可
 */

// function T(id) {
//   return (<FormattedMessage id={id} />);
// }

function T(id){
  return id;
}

export default function fromConfigfn() {
  return [
    {
      label: T('partyNo'),
      name: 'partyNo',
      component: Input,
    },
    {
      label: T('userName'),
      name: 'userName',
      component: Input,
    },
    {
      label: T('mobileNo'),
      name: 'mobileNo',
      component: Input,
    },
    {
      label: T('email'),
      name: 'email',
      component: Input,
    },
  ];
}