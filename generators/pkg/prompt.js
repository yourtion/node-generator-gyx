const { getGitOrigin } = require('../../utils');

module.exports = function() {
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
      default: this.appname,
    },
    {
      name: 'version',
      message: 'version:',
      default: '1.0.0',
    },
    {
      type: 'input',
      name: 'description',
      message: 'description:',
    },
    {
      name: 'author',
      default: `${this.user.git.name()} <${this.user.git.email()}>`,
      message: 'author',
    },
    {
      name: 'repo',
      default: repo,
      message: 'git repository:',
      filter: words => {
        return words
          .replace(/https?:\/\//, '')
          .replace(/^(.*?)@/, '')
          .replace(/.git$/, '');
      },
    },
    {
      name: 'keywords',
      message: 'keywords',
      filter: words => {
        return words.split(/\s*,\s*/g);
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
