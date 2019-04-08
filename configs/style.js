import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear';
import basePlugin from './basePugins';

const createStyleConfig = (moduleName, external) => ({
  input: `components/${moduleName}/index.jsx`,
  output: {
    file: `garbage/${moduleName}.js`,
    format: 'es'
  },
  plugins: [
    clear({
      targets: ['garbage']
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
      // 样式输出到 createModuleConfig 创建的模块文件夹下
      extract: `lib/${moduleName}/style/index.css`
    }),

    ...basePlugin
  ],
  external: id => external.some(e => id.indexOf(e) === 0)
});

export default createStyleConfig;
