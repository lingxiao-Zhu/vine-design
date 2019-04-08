import postcss from 'rollup-plugin-postcss';
import { eslint } from 'rollup-plugin-eslint';
import clear from 'rollup-plugin-clear';
import { uglify } from 'rollup-plugin-uglify';
import basePlugin from './basePugins';

const createModuleConfig = (cModuleMap, external, isDev) => ({
  input: {
    index: 'index.js',
    ...cModuleMap
  },
  output: {
    dir: 'lib',
    format: 'cjs',
    sourceMap: true,
    entryFileNames: '[name]/index.js',
    exports: 'named'
  },
  experimentalCodeSplitting: true,
  plugins: [
    clear({
      targets: ['lib']
    }),

    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: ['.less', '.css'],
      use: [
        [
          'less',
          {
            javascriptEnabled: true
          }
        ]
      ],
      inject: isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
      extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
    }),

    eslint({
      throwOnError: true,
      include: ['components/**/*.js']
    }),

    !isDev && uglify(),
    ...basePlugin
  ],
  // 将模块视为外部模块，不会打包在库中
  external: id => external.some(e => id.indexOf(e) === 0)
});

export default createModuleConfig;
