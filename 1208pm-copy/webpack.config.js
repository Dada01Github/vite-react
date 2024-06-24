const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        //Menu: './src/Menu.js', // 主入口文件
        //Chart: './src/Chart.js', // 主入口文件
        index0623am: './src/index0623am.js',// 主入口文件
        //styles:'./src/styles.css'
    },
    output: {
        filename: '[name].pack.js', // 输出文件名
        path: path.resolve(__dirname, 'dist') // 输出目录
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
                
                // 在这里还可以添加其他的Babel插件和选项
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader'
            ]
          }
          // 在这里配置适当的loader来处理不同类型的文件
          // 例如处理React组件和CSS文件的loader
        ],
      },
};