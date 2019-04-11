const $ = require('dekko');
const chalk = require('chalk');

$('build/dist')
  .isDirectory()
  .hasFile('index.js')
  .hasDirectory('style');

$('build/dist/style').hasFile('index.css');

// eslint-disable-next-line
console.log(chalk.green("✨ `dist` directory is valid."));
