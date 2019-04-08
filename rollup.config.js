import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "lib/bundle.js",
    format: "umd"
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    }),
    resolve()
  ]
};
