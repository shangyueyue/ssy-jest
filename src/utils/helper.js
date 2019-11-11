const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const colors = require('colors/safe');

// 递归创建目录 同步方法
// eslint-disable-next-line consistent-return
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

function renderFile(templateFile, { pageName }) {
  const p = new Promise((resolve, reject) => {
    const cName = pageName[0].toUpperCase() + pageName.slice(1);
    ejs.renderFile(templateFile, { cName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return p;
}

async function createTemplate(templateFile, outputFile, options) {
  try {
    const datas = await renderFile(templateFile, options);
    const dirname = path.dirname(outputFile);
    // 创建目录
    mkdirsSync(dirname);
    fs.writeFile(outputFile, datas, (err) => {
      if (err) {
        console.log(colors.red(err));
      } else {
        console.log(colors.green(`${path.basename(outputFile)} create success!`));
      }
    });
  } catch (error) {
    console.log(colors.red(error));
  }
}

module.exports = {
  mkdirsSync,
  renderFile,
  createTemplate,

};
