import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const Plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**', // 只编译我们的源代码
    runtimeHelpers: true
  }),
  commonjs({
    include: /node_modules/
  })
];

export default Plugins;
