const CLI = require("clui");
const Spinner = CLI.Spinner;
const axios = require("axios");

module.exports = {
  getPublicRepos: async (user) => {
    const status = new Spinner(`Getting public repos from ${user}`);
    status.start();
    try {
      let repoList = await axios.get(
        `https://api.github.com/users/${user}/repos`
      );
      status.stop();
      return repoList;
    } catch (err) {
      status.stop;
      console.log(err);
    }
    status.stop();
  },
};
