#!/usr/bin/env node

const CLI = require("clui");
const Spinner = CLI.Spinner;
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const { printTable } = require("console-table-printer");

const inquirer = require("./lib/inquirer");
const github = require("./lib/github");
const git = require("./lib/repo");

clear();

console.log(
  chalk.yellow(figlet.textSync("Git Cloner", { horizontalLayout: "full" }))
);

const main = async () => {
  try {
    // ASK USER FOR GITHUB USERNAME
    const { username } = await inquirer.askUsername();
    // CALL TO GET USER REPOS
    const repos = await github.getPublicRepos(username);
    const filteredRepos = repos.data.map((e, i) => {
      const { name, clone_url } = e;
      return { index: i, name, clone_url };
    });
    // SHOW REPOS IN A TABLE
    printTable(filteredRepos);

    //ASK USER TO TYPE THE REPO THEY WANT TO CLONE
    const { repo } = await inquirer.chooseRepo(
      filteredRepos.map((e) => e.name)
    );

    // CLONE REPO
    await git.clone(filteredRepos.filter((e) => e.name === repo)[0].clone_url);

    //SHOW MESSAGE WHEN DONE
    console.log(chalk.green("Cloning repo..."));
  } catch (err) {
    console.log(err);
  }
};
main();
