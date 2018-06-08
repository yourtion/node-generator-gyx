'use strict';

const { getGitOrigin } = require('./utils');

exports.genPackage = function genPackage(base, addtion) {
  const pkg = {
    name: addtion.name,
    version: addtion.version,
    description: addtion.description,
    keywords: addtion.keywords,
    author: addtion.author,
    license: addtion.license,
  };
  Object.assign(pkg, base);
  if (addtion.repo) {
    pkg.repository = {
      type: 'git',
      url: `git+https://${addtion.repo}.git`,
    };
    pkg.bugs = {
      url: `https://${addtion.repo}/issues`,
    };
    pkg.homepage = `https://${addtion.repo}#readme`;
  }
  return pkg;
};

exports.prompts = function prompts() {
  const repo = getGitOrigin(this.destinationPath('./.git/config'));
  return [
    {
      type: 'list',
      name: 'language',
      message: 'Please choose Language:',
      choices: ['TypeScript', 'JavaScript'],
    },
    {
      name: 'name',
      message: 'package name:',
      default: this.appname && this.appname.replace(/\s/g, '-').replace('node-', ''),
      validate: input => {
        return !!input.match('^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$');
      },
    },
    {
      name: 'version',
      message: 'version:',
      default: '1.0.0',
      validate: input => {
        return !!input.match(/\d+\.\d+\.\d+/);
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'description:',
    },
    {
      name: 'author',
      default: `${this.user.git.name()} <${this.user.git.email()}>`,
      message: 'author:',
    },
    {
      name: 'repo',
      default: repo,
      message: 'git repository:',
      filter: repo => {
        return repo
          .replace(/https?:\/\//, '')
          .replace(/^(.*?)@/, '')
          .replace(/.git$/, '');
      },
    },
    {
      name: 'keywords',
      message: 'keywords:',
      filter: words => {
        return words && words.split(/\s+|,/g);
      },
    },
    {
      type: 'list',
      name: 'license',
      default: 'MIT',
      message: 'license:',
      choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0'],
    },
  ];
};
