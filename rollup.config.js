import fs from 'fs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const isDev = process.env.NODE_ENV === 'development';

// 生成config
const createConfig = (moduleName, modulePath) => ({
  input: modulePath,
  output: {
    file: `lib/${moduleName}/index.js`,
    format: 'umd',
    name: `vine-design-${moduleName}`, // bundlejs中导出的名称
    globals: {
      react: 'react'
    }
  },
  external: ['react'],
  plugins: [
    clear({
      targets: ['lib']
    }),
    resolve(),
    babel({
      exclude: ['node_modules/**', 'src/components/**/*.css'] // 只编译我们的源代码
    }),
    postcss({
      sourceMap: false, // true, "inline" or false
      extract: `lib/${moduleName}/style/index.css`,
      plugins: [
        simplevars(),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9' // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009'
        }),
        !isDev && cssnano()
      ],
      extensions: ['.css']
    }),
    !isDev && uglify()
  ]
});

// 将组件名称和路径生成入口对象
const componentDir = 'src/components';
const cModuleNames = fs.readdirSync(path.resolve(componentDir));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  // eslint-disable-next-line no-param-reassign
  prev[name] = `${componentDir}/${name}/index.jsx`;
  return prev;
}, {});

const configs = [];

// eslint-disable-next-line array-callback-return
Object.keys(cModuleMap).map((moduleName) => {
  configs.push(createConfig(moduleName, cModuleMap[moduleName]));
});

export default configs;
