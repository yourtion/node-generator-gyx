"use strict";

const fs = require("fs");

exports.getGitOrigin = function getGitOrigin() {
  let gitOrigin = "";
  try {
    const gitConfig = fs.readFileSync("./.git/config", "utf-8");
    const m = gitConfig.match(/\[remote\s+'origin']\s+url\s+=\s+(\S+)\s+/i);
    if (m) {
      gitOrigin = m[1];
    }
  } finally {
    return gitOrigin;
  }
};
