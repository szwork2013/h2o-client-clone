import webpack from 'webpack';
import path from 'path';

module.exports = {
    entry: {
        frontend: ['webpack-hot-middleware/client?http://localhost:3000','webpack/hot/only-dev-server',path.resolve(__dirname, '../src/frontend/index')],
        backend: ['webpack-hot-middleware/client?http://localhost:3000','webpack/hot/only-dev-server',path.resolve(__dirname, '../src/backend/index')],
    },
    module: {
        loaders: [
            {
                test: /src(\\|\/).+\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['transform-decorators-legacy'],
                    presets: ['latest', 'react', 'stage-0','react-hmre' ]
                }
            },
            {test: /\.s?css$/, loader: 'style!css!sass'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json', '.jsx'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: '../dist',
        hot: true,
        inline:true,
        progress:true,
        historyApiFallback:true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
