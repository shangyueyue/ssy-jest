const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const { createFileByTemplate, mkdirsSync } = require('../../utils/helper');


const { log } = console;

class PanelFactory {
  constructor() {
    this.options = {};
  }

  apply(options) {
    const prefix = `app_${options.moduleName}_${options.pageName}_`;
    const templateDir = path.join(__dirname, '../../template/panelTemplate');
    this.options = { ...options, prefix, templateDir };
    this.copyTemplateFile();
    this.generatePanelPage();
    this.generatePanelConfig();
    this.generateLacaleConfig();
  }

  getLocalesData() {
    const {
      generateData, prefix,
    } = this.options;
    return Object.keys(generateData).reduce((obj, key) => {
      const $key = prefix + key;
      // eslint-disable-next-line no-param-reassign
      obj[$key] = key;
      Object.keys(generateData[key]).forEach((subkey) => {
        const id = `${prefix + key}_${subkey}`;
        // eslint-disable-next-line no-param-reassign
        obj[id] = generateData[key][subkey];
      });
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

  generatePanelPage() {
    const { outputPath, pageName, templateDir } = this.options;
    const templateFile = path.join(templateDir, 'index.ejs');
    const outputFile = path.join(outputPath, 'index.js');
    const cName = `${pageName[0].toUpperCase()}${pageName.slice(1)}Page`;
    createFileByTemplate(templateFile, outputFile, { cName });
  }

  generatePanelConfig() {
    const {
      generateData, prefix, outputPath, templateDir,
    } = this.options;

    const panelConfigData = Object.keys(generateData).map((key) => ({
      header: prefix + key,
      model: key,
      body: Object.keys(generateData).map((subKey) => ({
        key: subKey,
        label: `${prefix + key}_${subKey}`,
        value: subKey,
      })),
    }));
    const templateFile = path.join(templateDir, 'panelConfig.ejs');
    const outputFile = path.join(outputPath, 'panelConfig.js');
    createFileByTemplate(templateFile, outputFile, { panelConfigData });
  }

  generateLacaleConfig() {
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

module.exports = new PanelFactory();
