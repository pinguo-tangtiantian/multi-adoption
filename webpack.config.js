//在终端中输入webpack命令时是自动读取webpack.config.js
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = {
    entry: {},
    output:{
      path:path.resolve(__dirname, 'server/views'),
      filename:'[name].js'
    },
    //设置开发者工具的端口号,不设置则默认为8080端口
    devServer: {
      contentBase: './server/views/',
      hot: true,
      inline: true,
      port: 3000
    },
    module:{
      rules:[
        {
          test:/\.(js|jsx)$/,
          exclude:/node_modules/,
          loader:'babel-loader'
        },
        {
          test: /\.(scss|sass|css)$/, 
          loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
        },
         
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name].css"),
      // new CleanWebpackPlugin(
      //   ['server/views'],
      //   {
      //     root: __dirname,    　　　　　　　　　　
      //     verbose: true　　　　　　　
      //   }
      // )
    ],
  };
   
  // 获取指定路径下的入口文件
  function getEntries(globPath) {
    const files = glob.sync(globPath),
     entries = {};
    files.forEach(function(filepath) {
      const split = filepath.split('/');
      const name = split[split.length - 2];
      entries[name] = './' + filepath;
    });
    return entries;
  }
       
  const entries = getEntries('app/pages/*/index.js');
   
  Object.keys(entries).forEach(function(name) {
    webpackConfig.entry[name] = entries[name];
    const plugin = new HtmlWebpackPlugin({
      filename: name + '.html',
      template: 'app/index.tmpl.html',
      inject: true,
      chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
  });
   
  module.exports = webpackConfig;