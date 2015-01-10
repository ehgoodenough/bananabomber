var gulp = require("gulp")
var gulp_sass = require("gulp-sass")
var gulp_prefixify_css = require("gulp-autoprefixer")
var gulp_minify_css = require("gulp-minify-css")
var gulp_minify_html = require("gulp-minify-html")
var gulp_json_transform = require("gulp-json-transform")
var gulp_uglify = require("gulp-uglify")
var gulp_if = require("gulp-if")

var vinyl_buffer = require("vinyl-buffer")
var vinyl_source = require("vinyl-source-stream")

var browserify = require("browserify")
var reactify = require("reactify")
var envify = require("envify/custom")
var aliasify = require("aliasify")

module.exports.markup = function()
{
    return gulp.src("./source/index.html")
               .pipe(gulp_if(is_gh_pages(), gulp_minify_html()))
}

module.exports.scripts = function()
{
    return browserify("./source/index.js")
               .transform("reactify")
               .transform(envify({
                   mode: process.env.mode
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
               .pipe(gulp_if(is_gh_pages(), gulp_uglify()))
}

module.exports.styles = function()
{
    return gulp.src("./source/index.scss")
               .pipe(gulp_sass())
               .pipe(gulp_prefixify_css())
               .pipe(gulp_if(is_gh_pages(), gulp_minify_css()))
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

function is_gh_pages()
{
    return process.env.mode == "gh_pages"
}
