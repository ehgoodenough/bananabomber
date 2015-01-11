var del = require("del")
var gulp = require("gulp")
var build = require("./build")

gulp.task("default", function()
{
    del(["./builds"], function()
    {
        build.markup().pipe(gulp.dest("./builds"))
        build.scripts().pipe(gulp.dest("./builds"))
        build.styles().pipe(gulp.dest("./builds"))
        build.assets().pipe(gulp.dest("./builds"))
        build.configs().pipe(gulp.dest("./builds"))
    })
})

gulp.task("gh_pages", function()
{
    process.env.platform = "gh_pages"
    gulp.start("default")
})
