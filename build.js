var gulp = require("gulp")
var gulp_sass = require("gulp-sass")
var gulp_css_prefixer = require("gulp-autoprefixer")
var gulp_json_transform = require("gulp-json-transform")

var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

module.exports.markup = function()
{
    return gulp.src("./source/index.html")
}

module.exports.scripts = function()
{
    return browserify("./source/index.js")
               .transform("reactify")
               .transform(envify({
                   devmode: true
               }))
               .transform(aliasify.configure({
                   configDir: __dirname,
                   aliases: {
                       "<source>": "./source",
                       "<assets>": "./source/assets",
                       "<scripts>": "./source/scripts",
                       "<styles>": "./source/styles"
                   }
               }))
               .bundle()
               .pipe(vinyl_source("index.js"))
               .pipe(vinyl_buffer())
}

module.exports.styles = function()
{
    return gulp.src("./source/index.scss")
               .pipe(gulp_sass())
               .pipe(gulp_css_prefixer())
}

module.exports.assets = function()
{
    return gulp.src("./source/assets/**/*", {base: "./source"})
}

module.exports.configs = function()
{
    return gulp.src("./package.json")
               .pipe(gulp_json_transform(function(data)
               {
                   delete data["dependencies"]
                   delete data["devDependencies"]
                   return data
               }, 2))
}
