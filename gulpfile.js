var del = require("del")
var gulp = require("gulp")
var build = require("./build")

gulp.task("default", function()
{
    process.env.mode = "development"
    
    del(["./builds"], function()
    {
        build.markup().pipe(gulp.dest("./builds"))
        build.scripts().pipe(gulp.dest("./builds"))
        build.styles().pipe(gulp.dest("./builds"))
        build.assets().pipe(gulp.dest("./builds"))
        build.configs().pipe(gulp.dest("./builds"))
    })
})
