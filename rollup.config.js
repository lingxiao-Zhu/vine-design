import resolve from 'rollup-plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { uglify } from 'rollup-plugin-uglify';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// 生成组件 name：path map
import cModuleMap from './cModuleMap';

const isDev = process.env.NODE_ENV === 'development';

/**
 *
 * @param {string} prefix 输出路径
 * @param {string} moduleName 模块名称
 * @param {string} modulePath 模块路径
 */
const createModuleConfig = (prefix, moduleName, modulePath) => ({
  input: modulePath,
  output: {
    file:
      moduleName === 'index'
        ? `${prefix}/index.js`
        : `${prefix}/${moduleName}/index.js`,
    format: 'umd',
    name: `vine-design-${moduleName}`, // bundlejs中导出的名称
    globals: {
      react: 'react'
    }
  },
  external: ['react'],
  plugins: [
    clear({
      targets: ['build']
    }),
    resolve(),
    babel({
      exclude: ['node_modules/**', 'src/**/*.css'] // 只编译我们的源代码
    }),
    postcss({
      sourceMap: false, // true, "inline" or false,
      inject: isDev,
      // eslint-disable-next-line no-nested-ternary
      extract: isDev
        ? false
        : moduleName === 'index'
          ? `${prefix}/style/index.css`
          : `${prefix}/${moduleName}/style/index.css`,
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

// 写入dist的配置
const configs = [createModuleConfig('build/dist', 'index', 'src/index.js')];

// 写入lib配置
// eslint-disable-next-line array-callback-return
if (!isDev) {
  Object.keys(cModuleMap).forEach((moduleName) => {
    configs.push(
      createModuleConfig('build/lib', moduleName, cModuleMap[moduleName])
    );
  });
}

export default configs;
