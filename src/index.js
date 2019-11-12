
const assert = require('assert');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const program = require('commander');
const inquirer = require('inquirer');


const pkg = require('../package.json');
// const main = require('./main');

const { log } = console;

program
  .version(pkg.version, '-v, --version')
  .option('-d --dirname <value>')
  .parse(process.argv);

assert(program.dirname, chalk.red('请通过 -d 指定输出文件目录'));

const questions = [
  {
    type: 'input',
    name: 'moduleName',
    message: '请输入module name:',
  },
  {
    type: 'input',
    name: 'pageName',
    message: '请输入page name:',
    filter(val) {
      return val.replace(/pages?/i, '');
    },
  },
  {
    type: 'list',
    message: '请选择模板template',
    name: 'template',
    default: 'Table',
    choices: [
      'Table',
      'Panel',
    ],
  },
];

inquirer
  .prompt(questions)
  .then((answers = {}) => {
    const { moduleName, pageName, template } = answers;
    assert(moduleName, chalk.red('没有输入module name'));
    assert(pageName, chalk.red('没有输入page name'));
    const outputPath = path.join(process.cwd(), program.dirname, moduleName, pageName);
    assert(!fs.existsSync(outputPath), chalk.red('目录已经存在'));
    const generatercFile = `${process.cwd()}/generaterc.js`;
    assert(fs.existsSync(generatercFile), chalk.red('需要在根目录配置generaterc文件'));
    const generatercFileData = require(generatercFile); // eslint-disable-line
    if (!generatercFileData || !generatercFileData.data) {
      log(chalk.red('generaterc 配置不正确'));
      return;
    }
    const options = {
      ...answers,
      dirname: program.dirname,
      outputPath,
      generateData: generatercFileData.data,
    };
    try {
      require(`./commands/${template}`).apply(options); // eslint-disable-line
    } catch (err) {
      log(chalk.red(err.message));
    }
  }).catch((err) => {
    log(chalk.red(err.message));
    process.exit();
  });
