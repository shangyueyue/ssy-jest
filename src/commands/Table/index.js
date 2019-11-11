const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const { createFileByTemplate, mkdirsSync } = require('../../utils/helper');


const { log } = console;

class TableFactory {
  constructor() {
    this.options = {};
  }

  init(options) {
    const prefix = `app_${options.moduleName}_${options.pageName}_`;
    const templateDir = path.join(__dirname, '../../template/tableTemplate');
    this.options = { ...options, prefix, templateDir };
    this.copyTemplateFile();
    this.generateTablePage();
    this.generateTableConfig();
    this.generateLacaleConfig();
  }

  getLocalesData() {
    const {
      generateData, prefix,
    } = this.options;
    return Object.keys(generateData).reduce((obj, key) => {
      const $key = prefix + key;
      // eslint-disable-next-line no-param-reassign
      obj[$key] = generateData[key];
      return obj;
    }, {});
  }

  copyTemplateFile() {
    const { outputPath, templateDir } = this.options;
    const templateDirFiles = fs.readdirSync(templateDir);
    templateDirFiles.forEach((file) => {
      const templateFile = path.join(templateDir, file);
      const outputFile = path.join(outputPath, file);
      if (path.extname(file) !== '.ejs') {
        // copy
        fse.copySync(templateFile, outputFile);
        log(chalk.green(` create success: ${path.relative(process.cwd(), outputFile)}`));
      }
    });
  }

  generateTablePage() {
    const { outputPath, pageName, templateDir } = this.options;
    const templateFile = path.join(templateDir, 'index.ejs');
    const outputFile = path.join(outputPath, 'index.js');
    const cName = `${pageName[0].toUpperCase()}${pageName.slice(1)}Page`;
    createFileByTemplate(templateFile, outputFile, { cName });
  }

  generateTableConfig() {
    const {
      generateData, prefix, outputPath, templateDir,
    } = this.options;
    const tableConfigData = Object.keys(generateData).map((key) => ({
      title: prefix + key,
      dataIndex: key,
      key,
      width: 120,
    }));
    const templateFile = path.join(templateDir, 'tableConfig.ejs');
    const outputFile = path.join(outputPath, 'tableConfig.js');
    createFileByTemplate(templateFile, outputFile, { tableConfigData });
  }

  generateLacaleConfig() {
    // const localesData = this.getLocalesData();
    const {
      dirname, moduleName, pageName,
    } = this.options;
    const localesData = this.getLocalesData();
    const outputFile = path.join(dirname, '../locales/en-US', `./${moduleName}`, `./${pageName}.js`);
    mkdirsSync(path.dirname(outputFile));
    const code = `export default ${JSON.stringify(localesData, null, 2)};
       `;
    fs.writeFileSync(outputFile, code, 'utf-8');
    log(chalk.green(` create success: ${path.relative(process.cwd(), outputFile)}`));
  }
}

module.exports = new TableFactory();
