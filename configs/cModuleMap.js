const fs = require('fs');
const path = require('path');

const componentDir = 'components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir)); // 返回一个包含“指定目录下所有文件名称”的数组对象。
const cModuleMap = cModuleNames.reduce((prev, name) => {
  // eslint-disable-next-line no-param-reassign
  prev[name] = `${componentDir}/${name}/index.jsx`;

  return prev;
}, {});

export default cModuleMap;
