
// module.exports = {
//   res_code: '0',
//   res_msg: '成功',
//   data: {
//     personInfo: {
//       partyNo: '111',
//       firstName: '111',
//       middleName: '111',
//       lastName: '111',
//       idType: '111',
//       idNo: '111',
//       sex: '111',
//       birthday: '111',
//       idExpireDate: '111',
//       mobileNo: '111',
//       email: '111',
//     },
//     employmentInfo: {
//       'job ': '111',
//       company: '111',
//       fundsource: '111',
//     },
//     taxInfo: {
//       residence: '111',
//       tin: '111',
//       lackReason: '111',
//       explanation: '1111',
//     },
//     residential: {
//       region: '111',
//       city: '111',
//       address: '111',
//       zipCode: '111',
//       identificationMethod: '111',

//     },
//     csa: {
//       riskProfile: '111',
//     },
//     bankInfo: {
//       referenceCode: '111',
//     },
//   },
// };


module.exports = {
  res_code: '0',
  res_msg: 'success',
  data: {
    totalCount: 1,
    totalPage: 1,
    pageIndex: 1,
    data: [
      {
        partyNo: 'partyNo',
        userName: 'Customer Name',
        mobileNo: 'Mobile Number',
        email: 'E-mail',
        registerTime: 'Registration Date',
        openAccountTime: 'Account Opening Date',
      },
    ],
  },
};
