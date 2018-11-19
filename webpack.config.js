const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    mode: 'development',
    entry: __dirname + "/src/app/main.ts",
    output: {
        filename: "app.bundle.js",
        path: __dirname + "/build",
        publicPath: "/build/"
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 8080,
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{ 
            test: /\.(ts|tsx)$/, 
            loader: 'ts-loader',
            exclude: "/node_modules/"
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ]
};