const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const { log } = console;
// 递归创建目录 同步方法
// eslint-disable-next-line consistent-return
function mkdirsSync(dirname) {
  // console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}
function renderejsTemplate(templateFile, options) {
  const p = new Promise((resolve, reject) => {
    ejs.renderFile(templateFile, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return p;
}

async function createFileByTemplate(templateFile, outputFile, options) {
  try {
    const datas = await renderejsTemplate(templateFile, options);
    const dirname = path.dirname(outputFile);
    // 创建目录
    mkdirsSync(dirname);
    fs.writeFileSync(outputFile, datas, 'utf-8');
    log(chalk.green(` create success: ${path.relative(process.cwd(), outputFile)}`));
  } catch (error) {
    log(chalk.red(error.message));
  }
}

module.exports = {
  mkdirsSync,
  renderejsTemplate,
  createFileByTemplate,
};
