const $ = require('dekko');
const chalk = require('chalk');

$('build/lib/*')
  .isDirectory()
  .hasFile('index.js')
  .hasDirectory('style');

$('build/lib/*/style')
  .hasFile('css.js')
  .hasFile('index.css');

// eslint-disable-next-line
console.log(chalk.green("✨ `lib` directory is valid."));
