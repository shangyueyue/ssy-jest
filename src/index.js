const fs = require('fs');
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const colors = require('colors/safe');
const pkg = require('../package.json');
const main = require('./main');

program
  .version(pkg.version, '-v, --version')
  .option('-d --dirname <value>')
  .parse(process.argv);

if (!program.dirname) {
  console.log(colors.red('请通过 -d 指定输出文件目录'));
  process.exit();
}

const questions = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'module name:',
  },
  {
    type: 'input',
    name: 'pageName',
    message: 'page name:',
  },
];
inquirer
  .prompt(questions)
  .then((answers) => {
    if (!answers.moduleName) {
      throw new Error('没有输入moduleName');
    }
    if (!answers.pageName) {
      throw new Error('没有输入pageName');
    }
    // 判断dirname是否存在;
    // eslint-disable-next-line no-underscore-dangle
    const _pageName = answers.pageName.replace(/pages?/i, '');
    const outputPath = path.join(process.cwd(), program.dirname, answers.moduleName, _pageName);
    if (fs.existsSync(outputPath)) {
      throw new Error('目录已经存在');
    }
    // 判断模板是否存在
    const templatedir = './tableTemplate';
    const templatePath = path.resolve(__dirname, './template', templatedir);
    if (!fs.existsSync(templatePath)) {
      throw new Error('tempalte 不存在');
    }
    // 调用main
    main({
      moduleName: answers.moduleName, pageName: _pageName, outputPath, templatePath,
    });
  }).catch((err) => {
    console.log(colors.red(err.message));
    process.exit();
  });
