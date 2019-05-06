const fs = require('fs');
const path = require('path');

const componentDir = 'build/lib';
const moduleNames = fs.readdirSync(path.resolve(componentDir));

moduleNames.forEach((moduleName) => {
  // 找到每个组件下的style文件夹
  const styleDirPath = path.resolve(componentDir, moduleName, 'style');

  if (!fs.existsSync(styleDirPath)) return;

  // 找到style文件夹下的所有文件
  const files = fs.readdirSync(styleDirPath);

  files.forEach((fileName) => {
    // 声明css.js文件路径
    const cssJsFilePath = path.resolve(styleDirPath, 'css.js');

    // 如果是css文件，就写入css.js
    if (fileName && /.css$/.test(fileName)) {
      const content = `
            import './${fileName}';
        `;

      if (!fs.existsSync(cssJsFilePath)) {
        fs.writeFileSync(cssJsFilePath, content);
      } else {
        fs.appendFileSync(cssJsFilePath, content);
      }
    }
  });
});
