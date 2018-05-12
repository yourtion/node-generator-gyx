const Generator = require('yeoman-generator');

const prompts = require('./prompt');
const { TS_FILE, TS_PACKAGE } = require('./config');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.language = '';
    this.prop = {};
  }

  prompting() {
    return this.prompt(prompts.call(this)).then(prop => {
      this.language = prop.language;
      delete prop.language;
      if (prop.repo) {
        prop.repository = {
          type: 'git',
          url: `git+https://${prop.repo}.git`,
        };
        prop.bugs = {
          url: `https://${prop.repo}/issues`,
        };
        prop.homepage = `https://${prop.repo}#readme`;
      }
      delete prop.repo;
      Object.assign(this.prop, prop);
      this.log('config: \n', JSON.stringify(this.prop, null, 2));
    });
  }

  writing() {
    this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
    if (this.language === 'TypeScript') {
      const packageInfo = this.fs.readJSON(this.templatePath('typescript/_package.json'));
      this.fs.extendJSON(this.destinationPath('package.json'), Object.assign({}, this.prop, packageInfo));
      for (const [src, dist] of TS_FILE) {
        this.fs.copy(this.templatePath('typescript/' + src), this.destinationPath(dist));
      }
    }
  }

  install() {
    if (this.language === 'TypeScript') {
      this.npmInstall(TS_PACKAGE, { 'save-dev': true, registry: 'https://registry.npm.taobao.org' });
    }
  }
};
