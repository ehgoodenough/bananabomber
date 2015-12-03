var fs = require("fs")
var path = require("path")
var gulp = require("gulp")
var chalk = require("chalk")
var yargs = require("yargs")
var jsesc = require("jsesc")
var cssesc = require("cssesc")
var rimraf = require("rimraf")
var ansiup = require("ansi_up")

var Webpack = require("webpack")
var WebpackText = require("extract-text-webpack-plugin")
var WebpackBump = require("bump-webpack-plugin")
var BrowserSync = require("browser-sync")
var Inliner = require("inliner")

var isServer = yargs.argv._.indexOf("server") != -1
var isBundle = yargs.argv._.indexOf("bundle") != -1
var inProduction = yargs.argv.production

var PORT = 1234

var errorstring = chalk.red("(with errors)")
var warningstring = chalk.yellow("(with warnings)")
var timestring = function() {
    var date = new Date()
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours()
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    var seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
    return "[" + chalk.green(hours + ":" + minutes + ":" + seconds) + "]"
}

var modal = function(messages, callback) {
    messages = "<div id=\"_1701\">" + messages.map(function(message) {
        return "<div>" + ansiup.ansi_to_html(message.toString()) + "</div>"
    }).join() + "</div>"
    var style = {
        "color": "#000",
        "font-style": "normal",
        "font-variant": "normal",
        "font-weight": "normal",
        "font-stretch": "normal",
        "font-size": "medium",
        "line-height": "normal",
        "font-family": "monospace",
        "background-color": "#FFF",
        "white-space": "pre-wrap",
        "padding": "2em",
    }
    style = Object.keys(style).map(function(key) {
        return key + ":" + style[key] + ";"
    }).join(" ")
    messages = "<style>#_1701 {" + style + "}</style>" + messages
    messages = "document.body.innerHTML=\"" + jsesc(messages, {quotes: "double"}) + "\""
    fs.writeFile("./builds/web/index.js", messages, callback)
}

var render = new function() {
    this.js = function(strings) {
        if(strings instanceof Array == false) {
            strings = new Array(strings)
        }
        var styles = {
            "color": "#000 !important",
            "padding": "2em !important",
            "font-size": "medium !important",
            "font-style": "normal !important",
            "font-weight": "normal !important",
            "font-variant": "normal !important",
            "font-stretch": "normal !important",
            "font-family": "monospace !important",
            "line-height": "normal !important",
            "white-space": "pre-wrap !important",
            "background-color": "#FFF !important",
        }
        styles = Object.keys(styles).map(function(key) {
            return key + ":" + styles[key] + ";"
        }).join(" ")
        strings = strings.map(function(message) {
            return "<div>" + ansiup.ansi_to_html(message) + "</div>"
        })
        strings = "<div style=\"" + styles + "\">" + strings.join() + "</div>"
        strings = "document.body.innerHTML=\"" + jsesc(strings, {quotes: "double"}) + "\""
        strings = "window.addEventListener(\"DOMContentLoaded\", function() {" + strings + "}"
        return strings
    }
}

//also console.log in terminal messages?
//account for script being in a dumb place?

var build = {
    "web/index.js": function(done) {
        Webpack({
            entry: {
                "index.js": "./source/index.js"
            },
            output: {
                path: "./builds/web",
                filename: "index.js"
            },
            watch: isServer,
            module: {
                preLoaders: [
                    //{test:/\.js$/, exclude: /node_modules/, loader: "eslint-loader"}
                ],
                loaders: [
                    {test: /\.js$/i, exclude: /(node_modules)/i, loader: "babel-loader"},
                    {test: /\.(ttf|otf|woff|svg)$/i, loader: "url-loader"},
                    {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-Webpack-loader"]},
                    {test: /\.s?css$/i, loaders: ["style-loader", "css-loader" + (inProduction ? "?minimize" : ""), "autoprefixer-loader", "sass-loader"]},
                ]
            },
            plugins: [
                //new Webpack.optimize.UglifyJsPlugin()
                new WebpackBump("package.json"),
                new Webpack.DefinePlugin({
                    SOURCE: JSON.stringify(path.join(__dirname, "./source")),
                    VERSION: JSON.stringify(JSON.parse(fs.readFileSync("./package.json")).version),
                    MODE: JSON.stringify(inProduction ? "PRODUCTION" : "DEVELOPMENT"),
                }),
            ]
        }, function(error, results) {
            if(!!error) {throw error}
            if(results.compilation.errors.length > 0) {
                var errors = results.compilation.errors.map(function(error) {
                    return error.toString()
                })
                // log.js("./builds/web/index.js", errors, function() {
                //     log("Building ./builds/web/index.js", errorstring)
                //     log(errors)
                //     if(!!done) {
                //         done()
                //     }
                // })
            } else if(results.compilation.warnings.length > 0) {
                modal(results.compilation.warnings, function() {
                    console.log(timestring(), "Building ./builds/web/index.js", warningstring)
                    results.compilation.warnings.forEach(function(warning) {
                        console.log(warning.toString())
                    })
                    if(!!done) {
                        done()
                    }
                })
            } else {
                console.log(timestring(), "Building ./builds/web/index.js")
                if(!!done) {
                    done()
                }
            }
        })
    },
    "web/index.css": function(done) {
        Webpack({
            watch: isServer,
            entry: {
                "index.css": "./source/index.css"
            },
            output: {
                path: "./builds/web",
                filename: "index.css"
            },
            module: {
                loaders: [
                    {test: /\.(ttf|otf|woff|svg)$/i, loader: "url-loader"},
                    {test: /\.(png|jpe?g|gif|svg)$/i, loaders: ["url-loader", "image-webpack-loader"]},
                    {test: /\.s?css$/i, loader: WebpackText.extract(["css-loader" + (isBundle ? "?minimize" : ""), "autoprefixer-loader", "sass-loader"])},
                ]
            },
            plugins: [
                new WebpackText("index.css")
            ]
        }, function(error, results) {
            if(!!error) {throw error}
            if(results.compilation.errors.length > 0) {
                //put into a different modal function
                errors = results.compilation.errors.join("\n")
                errors = "body:before{content:\"" + cssesc(errors, {quotes: "double"}) + "\";}"
                errors = "body{font-family:monospace;white-space:pre;}" + errors
                fs.writeFile("./builds/web/index.css", errors, function() {
                    console.log(timestring(), "Building ./builds/web/index.css", errorstring)
                    if(!!done) {
                        done()
                    }
                })
            } else {
                console.log(timestring(), "Building ./builds/web/index.css")
                if(!!done) {
                    done()
                }
            }
        })
    },
    "web/index.html": function(done) {
        gulp.src("./source/index.html")
            .pipe(gulp.dest("./builds/web"))
            .on("end", function() {
                console.log(timestring(), "Building ./builds/web/index.html")
                if(!!done) {
                    done()
                }
            })
    },
    "web1/index.html": function(done) {
        var inliner = new Inliner("./builds/web/index.html", function(error, file) {
            fs.mkdir("./builds/web1", function() {
                fs.writeFile("./builds/web1/index.html", file, function() {
                    console.log(timestring(), "Built the HTML1")
                    if(!!done) {
                        done()
                    }
                })
            })
        })
    }
}

if(isServer) {
    rimraf("./builds", function() {
        console.log(timestring(), "Started the server")
        build["web/index.js"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        build["web/index.css"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        build["web/index.html"](function() {
            if(!!server && !!server.active) {
                server.reload()
            }
        })
        var server = BrowserSync({
            server: "./builds/web",
            logLevel: "silent",
            notify: false,
            port: PORT
        })
    })
} else if(isBundle) {
    rimraf("./builds", function() {
        // async.parallel([
        //     build["web/index.js"],
        //     build["web/index.css"],
        //     build["web/index.html"],
        // ], function() {
        //     build["web1/index.html"]()
        // })
    })
} else {
    rimraf("./builds", function() {
        build["web/index.js"]()
        build["web/index.css"]()
        build["web/index.html"]()
    })
}

// packaging updates
//     output into executables via NodeWebkit
//     minify html and css and js (but only in production)
//     minify js and css with usable sourcemaps
//     don't include tests (and lints?) when in production
//     lint the css
//     convert all ansi warnings to html modal
//     modal should pop up for sev-2 errors, but not for sev-1 warnings
//     watch for html changes
//     include the version number in the title of the html
//     automatically downloads dependencies
// fix bugs
//     error sometimes breaks watch (cannot repro yet)
//     don't start the server until one iteration of the builds
