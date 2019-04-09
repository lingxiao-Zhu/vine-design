import fs from 'fs';
import path from 'path';

// 将组件名称和路径生成入口对象
const componentDir = 'src/components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  // eslint-disable-next-line no-param-reassign
  prev[name] = `${componentDir}/${name}/index.jsx`;
  return prev;
}, {});

export default cModuleMap;
