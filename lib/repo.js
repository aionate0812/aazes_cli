const git = require("simple-git/promise")();

module.exports = {
  clone: (clonePath) => {
    git.clone(clonePath);
  },
};
