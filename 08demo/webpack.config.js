const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, './public/'),
        publicPath: '/',
        host: 'localhost',
        port: 3000,
        stats: {
            colors: true
        }
    },
    entry: './src/index.js',  //添加入口配置项
    //出口文件的配置项
    output:{
        //输出的路径
        path:path.join(__dirname, '/dist'),
        //文件名加哈希
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve('src')
          }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // jsx/js文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            // 添加 preset-react
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env'), {modules: false}]
                        ],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,   // 正则表达式，表示.css后缀的文件
                use: ['style-loader','css-loader']   // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },
            {
                //匹配规则
                test:/\.less$/,
                //loader加载顺序 不能颠倒
                use: ['style-loader', 'css-loader','less-loader']
            },
            {
                //匹配规则
                test:/\.scss$/,
                //loader加载顺序 不能颠倒
                use: ['style-loader', 'css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: true
        })
    ]
};