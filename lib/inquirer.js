const inquirer = require("inquirer");

module.exports = {
  askUsername: () => {
    return inquirer.prompt([
      {
        name: "username",
        type: "input",
        message: "Enter Github username:",
        validate: (value) => {
          if (value.length) return true;
          else return "Please enter a valid Github username:";
        },
      },
    ]);
  },
  chooseRepo: (repos) => {
    return inquirer.prompt([
      {
        type: "list",
        name: "repo",
        message: "Choose repo to clone:",
        choices: repos,
        default: repos[0],
      },
    ]);
  },
};
