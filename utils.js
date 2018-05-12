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
