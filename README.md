# vine-design

A React mobile UI design language

基于 React 的 mobile 端 UI 框架

[![Coverage Status](https://coveralls.io/repos/github/lingxiao-Zhu/vine-design/badge.svg?branch=master)](https://coveralls.io/github/lingxiao-Zhu/vine-design?branch=master) ![](https://img.shields.io/github/languages/count/lingxiao-Zhu/vine-design.svg) ![](https://img.shields.io/github/languages/code-size/lingxiao-Zhu/vine-design.svg) ![](https://img.shields.io/github/downloads/lingxiao-Zhu/vine-design/total.svg) ![](https://img.shields.io/github/last-commit/lingxiao-Zhu/vine-design.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

## Install(安装)

`npm install vine-design`

## Usage(使用)

```javascript
import { XXX } from "vine-design";
import "vine-design/build/dist/style/index.css";
```

## Use modularized(按需加载)

```javascript
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "vine-design",
      "libraryDirectory": "build/lib",
      "style": "css"
    }]
  ]
}
```

这样就只需从 vine-design 中引入模块即可，无需单独引入样式：

```javascript
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { XXX } from "antd";
```

## Development(开发)

```bash
$ git clone https://github.com/lingxiao-Zhu/vine.git
$ cd vine-design
$ npm install
$ npm start
```
