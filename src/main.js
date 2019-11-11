const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const colors = require('colors/safe');
const { createTemplate, mkdirsSync } = require('./utils/helper');

function creatPage({
  outputPath, templatePath, pageName,
}) {
  const templateFiles = fs.readdirSync(templatePath);
  templateFiles.forEach((file) => {
    const templateFile = path.join(templatePath, file);
    let outputFile = path.join(outputPath, file);
    if (path.extname(file) !== '.ejs') {
      // copy
      fse.copySync(templateFile, outputFile);
      console.log(colors.green(`${path.basename(outputFile)} create success!`));
    } else {
      // ejs
      outputFile = outputFile.replace(/\.ejs/, '.js');
      createTemplate(templateFile, outputFile, { pageName });
    }
  });
}

function createLacaleConfig(dataobj, moduleName, pageName, prefix) {
  const data = Object.keys(dataobj).reduce((pre, cur) => {
    const key = prefix + cur;
    // eslint-disable-next-line no-param-reassign
    pre[key] = dataobj[cur];
    return pre;
  }, {});
  const code = `
  export default ${JSON.stringify(data, null, 2)};
   `;
  const outputPathFile = path.join(process.cwd(), './src/app/locales/en-US', moduleName, `${pageName}.js`);
  const dirname = path.dirname(outputPathFile);
  // 创建目录
  mkdirsSync(dirname);
  fs.writeFile(outputPathFile, code, (err) => {
    if (err) {
      console.log(colors.red(err));
    } else {
      console.log(colors.green(`${path.basename(outputPathFile)} create success!`));
    }
  });
}

function createTableConfig({ outputPath, pageName, moduleName }) {
  const configfile = `${process.cwd()}/template.config.js`;
  if (!fs.existsSync(configfile)) {
    throw new Error('template.config.js 不存在');
  }
  const resData = require(configfile); // eslint-disable-line
  if (!resData || !resData.data || !resData.data.data) return;
  const dataobj = resData.data.data[0];
  const prefix = `app_${moduleName}_${pageName}_`;
  const data = Object.keys(dataobj).map((key) => ({
    title: `T('${prefix}${key}')`,
    dataIndex: key,
    key,
    width: 120,
  }));
  const code = `
import React from 'react';
import { FormattedMessage } from 'react-intl';

function T(id) {
  return (<FormattedMessage id={id} />);
}

export default function tableconfigfn() {
  return ${JSON.stringify(data, null, 2)};
} `;
  const outputPathFile = path.join(outputPath, './tableConfig.js');
  fs.writeFile(outputPathFile, code, (err) => {
    if (err) {
      console.log(colors.red(err));
    } else {
      console.log(colors.green(`${path.basename(outputPathFile)} create success!`));
    }
  });
  // locale
  createLacaleConfig(dataobj, moduleName, pageName, prefix);
}

function main({
  moduleName, outputPath, templatePath, pageName,
}) {
  // creatPage
  creatPage({
    outputPath, templatePath, moduleName, pageName,
  });
  // table config
  createTableConfig({ outputPath, pageName, moduleName });
}

module.exports = main;
