const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = {
  ...baseConfig,
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    App: path.resolve(__dirname, '../src/index.tsx'),
    fileEditor: path.resolve(__dirname, '../src/fileEditor/index.tsx'),
    tourGuide: path.resolve(__dirname, '../src/tourGuide/index.tsx'),
  },
  target: 'electron-renderer',
  // 默认为 './src'
  // 这里应用程序开始执行
  // webpack 开始打包
  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, '..', "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "bundle_[name].js", // string
    // 「入口分块(entry chunk)」的文件名模板
    // publicPath: "/assets/", // string
    // 输出解析文件的目录，url 相对于 HTML 页面
    // library: "MyLibrary", // string,
    // 导出库(exported library)的名称
    // libraryTarget: "umd", // 通用模块定义
    // 导出库(exported library)的类型
    /* 高级输出配置（点击显示） */
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    // 关于模块配置
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // 标识应用这些规则，即使规则覆盖（高级选项）
        loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。
        options: {
          presets: ["es2015"]
        },
        // loader 的可选项
      },
      {
        rules: [
          {
            test: /\.(le|c)ss$/,
            use: ['style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: false,
                }
              }
              , 'less-loader'
            ]
          },
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
          }
        ]
      }
    ],
    /* 高级模块配置（点击展示） */
  },
  resolve: {
    // 解析模块请求的选项
    extensions: [".ts", ".tsx", ".js", ".json"],
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
    ],
    // 用于查找模块的目录
    // extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名
    alias: {
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "@root": path.resolve(__dirname, "../src"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
      "@logger": path.resolve(__dirname, "../logger"),
    },
  },
  devtool: "source-map",
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, '../dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './pages/app.html',
      chunks: ['App'],
    }),
    new HtmlWebpackPlugin({
      filename: 'fileEditor.html',
      template: './pages/fileEditor.html',
      chunks: ['fileEditor'],
    }),
    new HtmlWebpackPlugin({
      filename: 'tourGuide.html',
      template: './pages/tourGuide.html',
      chunks: ['tourGuide'],
    }),
    new CleanWebpackPlugin()
  ],
  externals: {
    'echarts/dist/extension/bmap': 'BMap'
  },
}