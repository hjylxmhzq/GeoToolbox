const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: path.resolve(__dirname, '../electron/main.ts'),
  target: 'electron-main',
  // 默认为 './src'
  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, '..', "electron-dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "main.js", // string
    // 「入口分块(entry chunk)」的文件名模板
    // publicPath: "/assets/", // string
    // 输出解析文件的目录，url 相对于 HTML 页面
    // library: "MyLibrary", // string,
    // 导出库(exported library)的名称
    // libraryTarget: "umd", // 通用模块定义
    // 导出库(exported library)的类型
    /* 高级输出配置（点击显示） */
  },
  module: {
    // 关于模块配置
    rules: [
      {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            options: {
              // ... other loader's options
              configFileName: 'tsconfig.electron.json'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
          // ... other loader's options
          configFileName: 'tsconfig.electron.json'
        }
      }
    ],
  },
  externals: (() => {
    var nodeModules = {};
    fs.readdirSync('node_modules')
      .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
      })
      .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
      });
    return nodeModules;
  })(),
  resolve: {
    // 解析模块请求的选项
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "@logger": path.resolve(__dirname, "../logger"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
  },
  devtool: "source-map",
}