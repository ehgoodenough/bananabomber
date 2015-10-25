var BrowserSync = require("browser-sync")
var BumpWebpackPlugin = require("bump-webpack-plugin")
var Webpack = require("webpack")

var yargs = require("yargs")
var gulp = require("gulp")
var del = require("del")

var webpack = Webpack({
    entry: {
        "index.js": "./source/index.js"
    },
    output: {
        path: "./build/web",
        filename: "[name]",
    },
    module: {
        loaders: [
            {
                test: /\.(png|jp?|gif|svg)$/i,
                loaders: ["url-loader", "image-webpack-loader"],
            },
            {
                test: /\.(jsx?)$/i,
                exclude: /(node_modules)/,
                loader: "babel-loader",
            }
        ]
    },
    plugins: [
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
        gulp.src("./source/index.html")
            .pipe(gulp.dest("./build/web"))
        gulp.src("./source/index.css")
            .pipe(gulp.dest("./build/web"))
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
        gulp.src("./source/index.html")
            .pipe(gulp.dest("./build/web"))
        gulp.src("./source/index.css")
            .pipe(gulp.dest("./build/web"))
        webpack.run(function(error, results) {
            console.log("Building ``./source/index.js`` for [web].")
            results.compilation.errors.forEach(function(error) {
                console.log(error.toString())
            })
        })
    }
})
