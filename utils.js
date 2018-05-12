'use strict';

const fs = require('fs');

function getGitOrigin(gitConfigFile) {
  try {
    const gitConfig = fs.readFileSync(gitConfigFile, 'utf-8');
    const m = gitConfig.match(/\s+url\s+=\s+(\S+)\s+/i);
    if (m) {
      return m[1].replace(/:/g, '/');
    }
  } catch (_err) {
    return;
  }
}
exports.getGitOrigin = getGitOrigin;

exports.genPackage = (base, addtion) => {
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
