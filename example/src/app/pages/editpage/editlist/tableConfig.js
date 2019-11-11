
import React from 'react';
import { FormattedMessage } from 'react-intl';

function T(id) {
  return (<FormattedMessage id={id} />);
}

export default function tableconfigfn() {
  return [
          {
            title: T('app_editpage_editlist_partyNo'),
            dataIndex: 'partyNo',
            key: 'partyNo',
            width: 120,
          },
          {
            title: T('app_editpage_editlist_userName'),
            dataIndex: 'userName',
            key: 'userName',
            width: 120,
          },
          {
            title: T('app_editpage_editlist_mobileNo'),
            dataIndex: 'mobileNo',
            key: 'mobileNo',
            width: 120,
          },
          {
            title: T('app_editpage_editlist_email'),
            dataIndex: 'email',
            key: 'email',
            width: 120,
          },
          {
            title: T('app_editpage_editlist_registerTime'),
            dataIndex: 'registerTime',
            key: 'registerTime',
            width: 120,
          },
          {
            title: T('app_editpage_editlist_openAccountTime'),
            dataIndex: 'openAccountTime',
            key: 'openAccountTime',
            width: 120,
          },
  ];
}
