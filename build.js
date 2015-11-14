var Webpack = require("webpack")
var TextWebpackPlugin = require("extract-text-webpack-plugin")
var BumpWebpackPlugin = require("bump-webpack-plugin")
var BrowserSync = require("browser-sync")

var fs = require("fs")
var del = require("del")
var gulp = require("gulp")
var yargs = require("yargs")
var jsesc = require("jsesc")
var ansiup = require("ansi_up")

var Webpacker = function(config) {
    this.webpack = Webpack(config)
    this.config = config
}

Webpacker.prototype.run = function(func) {
    this.webpack.run(this._handle(func))
}

Webpacker.prototype.watch = function(func) {
    this.webpack.watch({}, this._handle(func))
}

Webpacker.prototype._handle = function(func) {
    return function(error, results) {
        if(results.compilation.errors.length > 0) {
            var errors = results.compilation.errors.map(function(error) {
                return "<div>" + ansiup.ansi_to_html(error.toString()) + "</div>"
            }).join()
            errors = "<style>div{font-family: monospace;white-space:pre;}</style>" + errors
            errors = "document.body.innerHTML = \"" + jsesc(errors, {quotes: "double"}) + "\""
            fs.writeFile("./build/web/index.js", errors, function() {
                func()
            })
        } else {
            func()
        }
    }
}

var BrowserSyncer = function(config) {
    this.browsersync = undefined
    this.config = config
}

BrowserSyncer.prototype.reload = function() {
    if(this.browsersync == undefined) {
        this.browsersync = BrowserSync(this.config)
    } else {
        this.browsersync.reload()
    }
}

var webpacker = new Webpacker({
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

var browsersyncer = new BrowserSyncer({
    server: "./build/web",
    logLevel: "silent",
    notify: false,
    port: 1234,
})

var logger = function(string) {
    console.log(string)
}

del("./build/web").then(function() {
    if(yargs.argv._.indexOf("server") != -1) {
        webpacker.watch(function() {
            logger("Watching ``./source/index.js``")
            browsersyncer.reload()
        })
    } else {
        webpacker.run(function() {
            logger("Running ``./source/index.js``")
        })
    }
    gulp.src("./source/index.css").pipe(gulp.dest("./build/web/"))
    gulp.src("./source/index.html").pipe(gulp.dest("./build/web/"))
})
