var BrowserSync = require("browser-sync")
var TextWebpackPlugin = require("extract-text-webpack-plugin")
var BumpWebpackPlugin = require("bump-webpack-plugin")
var Webpack = require("webpack")

var yargs = require("yargs")
var del = require("del")

var package = require("./package.json")

var webpack = Webpack({
    entry: {
        "index.js": "./source/index.js",
        "index.html": "./source/index.html",
    },
    output: {
        path: "./build/web",
        filename: "[name]",
    },
    module: {
        loaders: [
            {test: /\.js$/i, exclude: /(node_modules)/, loader: "babel-loader"},
            {test: /\.css$/i, loaders: ["style-loader", "css-loader"]},
            {test: /\.html$/i, loader: TextWebpackPlugin.extract("html-loader")},
            {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-webpack-loader"]},
        ]
    },
    plugins: [
        new TextWebpackPlugin("index.html"),
        new BumpWebpackPlugin("package.json"),
    ]
})

del("./build/web").then(function() {
    if(yargs.argv._.indexOf("server") != -1) {
        var browsersync = BrowserSync({
            server: "./build/web",
            logLevel: "silent",
            notify: false,
            port: 1234,
        })
        webpack.watch({}, function(error, results) {
            console.log("Building ``./source/index.js`` for [web].")
            if(results.compilation.errors.length > 0) {
                results.compilation.errors.forEach(function(error) {
                    console.log(error.toString())
                })
            } else {
                browsersync.reload()
            }
        })
    } else {
        webpack.run(function(error, results) {
            console.log("Building from ``./source/**/*`` for [web].")
            results.compilation.errors.forEach(function(error) {
                console.log(error.toString())
            })
        })
    }
})
