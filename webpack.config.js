const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DotenvWebpack = require('dotenv-webpack');
const DotEnvPlugin = new DotenvWebpack({
    path: './.env',
    systemvars: true,
});

module.exports = {

    watch: true,

    target: 'electron-renderer',

    entry: [
        './app/src/renderer_process.js',
    ],

    output: {
        path: __dirname + '/app/build/',
        filename: 'bundle.js',
        publicPath: __dirname + '/app/build/',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react'],
                }
            }, {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }, {
                test: /\.(png|jpg|gif|svg)(\?.*$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    },
                }],
            },
        ],
    },

    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            'intergrip-util': 'node_modules/intergrip-util-js/dist/index.js',
            'intergrip-menu': 'app/src/components/ui/menu/Items.jsx',
            'intergrip-content': 'app/src/components/ui/content',
            'intergrip-ui': 'app/src/components/ui',
            'intergrip-components': 'app/src/components',
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "helpdesk.css",
        }),
        DotEnvPlugin,
    ],
};
