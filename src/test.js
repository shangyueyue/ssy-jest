// const ejs = require('ejs');
// const path = require('path');
// const fs = require('fs');
// const fse = require('fs-extra');

// const templateFile = path.resolve(__dirname, './template/tableTemplate/tableConfig.ejs');
// const data = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//     width: 50,
//   },
//   {
//     title: '用户名',
//     dataIndex: 'username',
//     key: 'username',
//     width: 100,
//   },
// ];

// ejs.renderFile(templateFile, { data }, function (err, data) {
//   if (err) {
//     console.log("err", err)
//   } else {
//     console.log('data', data);
//     fs.writeFile('./test.js', data, err => {
//       if (err) {
//         console.log("err1", err)
//         // console.log(colors.red(err));
//       } else {
//         console.log("succuss")
//         // console.log(colors.green(`${path.basename(outputFile)} create success!`));
//       }
//     });
//   }
// });
// const content = `
//   export default function tableconfigfn(T){
//     return ${JSON.stringify(data, null, 2)};
//   }
// `
// fs.writeFile('./test.js', content, err => {
//   if (err) {
//     console.log("err1", err)
//     // console.log(colors.red(err));
//   } else {
//     console.log("succuss")
//     // console.log(colors.green(`${path.basename(outputFile)} create success!`));
//   }
// });

// const templatedir = './table'
// const templatePath = path.resolve(__dirname, '/template/', templatedir);
// console.log(templatePath)

// fse.copySync(path.join(__dirname, './index.js'), path.join(__dirname, './temp/copy.js'));
