'use strict';

const Generator = require('yeoman-generator');

const { genPackage, prompts } = require('../../utils/npm');
const { TS_FILE, TS_PACKAGE } = require('./config');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.isTS = false;
    this.isJS = false;
    this.lang = '';
    this.prop = {};
  }

  prompting() {
    return this.prompt(prompts.call(this)).then(prop => {
      this.prop = prop;
      this.lang = this.prop.language.toLocaleLowerCase();
      this.isTS = this.prop.language === 'TypeScript';
      this.isJS = this.prop.language === 'JavaScript';
      this.log(JSON.stringify(prop, null, 2));
    });
  }

  writing() {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    const packageInfo = this.fs.readJSON(this.templatePath(this.lang + '/package.json'));
    this.fs.extendJSON(this.destinationPath('package.json'), genPackage(packageInfo, this.prop));
    if (this.isTS) {
      for (const [ src, dist ] of TS_FILE) {
        this.fs.copy(this.templatePath('typescript/' + src), this.destinationPath(dist));
      }
    }
  }

  install() {
    if (this.isTS) {
      this.npmInstall(TS_PACKAGE, { 'save-dev': true, registry: 'https://registry.npm.taobao.org' });
    }
  }
};
