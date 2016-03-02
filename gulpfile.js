"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const sequence = require("run-sequence");
const exec = require("child_process").exec;

// Gulp plugins
var minifyCss = require("gulp-minify-css");
var less = require("gulp-less");

let serverPID = null;

gulp.task("build-sources", function () {
    return browserify({entries: "./src/app.jsx", extensions: [".jsx"], debug: true})
        .transform("babelify", {presets: ["es2015", "react", "stage-1"], plugins: ["transform-decorators-legacy"]})
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./dist/js"));
});



//==============
// compile all ES6 modules to ES5 and register modules via SystemJS
gulp.task('build:system', function () {
    return gulp.src( "./src/app.jsx" )
        .pipe(babel())
        .pipe(gulp.dest( "./dist/js" ));
});

// bundle the SystemJS files to one single bundle standalone file
//gulp.task('build:bundle', function () {
//    builder.buildSFX(CONFIG.bundleName, CONFIG.bundleBuild, options).then(function() {
//        console.log('Build complete');
//    })
//        .catch(function(err) {
//            console.log('Build error');
//            console.log(err);
//        });
//
//});
//==============

gulp.task("build-html", [], function () {
    var options = {
        collapseWhitespace: true,
        removeComments    : true,
        caseSensitive     : true,
        minifyJS          : true,
        minifyCSS         : true

    };
    gulp.src("./resources/html/*.html")
        .pipe(gulp.dest("./views"));
});

gulp.task("build-css", [], function() {
    gulp.src("./resources/styles/main.less")
        .pipe(less())
        .pipe(minifyCss())
        .pipe(gulp.dest("./dist/css"));
});


gulp.task("copy-libs", function(){
    gulp.src("./resources/lib/**")
        .pipe(gulp.dest("./dist/lib"));
} );

gulp.task("copy-images", function(){
    gulp.src("./resources/images/**")
        .pipe(gulp.dest("./dist/images"));
} );

gulp.task("watch-src", ["build-sources"], function (done) {
    gulp.watch(["./src/**/*.jsx", "./src/**/*.js"], ["build-sources"]);
    done();
});

gulp.task("watch-html", function(done){
    // We watch the html page for changes
    gulp.watch("./resources/html/*").on("change", function(){
        sequence("build-html", "run-server");
    });
    done();
});

gulp.task("watch-less", function(done) {
    gulp.watch(["./resources/styles/*"], ["build-css"]);
    done();
});

gulp.task("build-server", function(done) {
    exec("go build .", function(err, stdout, stderr) {
        if (err) {
            console.error("Err running server: ", err)
        }
        if (stderr) {
            console.error("stderr: ", stderr);
        }
        console.log("Server started: ", stdout);
        done();
    });
});

gulp.task("run-server", function(done) {
    console.log("Running server");
    if (serverPID != null) {
        console.log("Killing server");
        exec("kill " + serverPID);
    }
    let childProcess = exec("./codebin", function(err, stdout, stderr) {
        if (err) {
            console.error("Err running server: ", err)
        }
        if (stderr) {
            console.error("stderr: ", stderr);
        }
        console.log("Server started: ", stdout);
    });
    serverPID = childProcess.pid;
    console.log("PID: ", serverPID);
    done();
});



gulp.task("develop", [], function (done) {
    process.env.isProduction = false;
    return sequence(
        "build-server",
        [
            "build-html",
            "build-css",
            "copy-libs",
            "copy-images",
            "watch-src",
            "watch-less",
            "watch-html"
        ],
        "run-server",
        done
    );
});

gulp.task("build-production", [], function () {
    process.env.isProduction = true;
    sequence(["build-sources", "build-html", "build-css", "copy-libs", "copy-images"]);
});

gulp.task("default", ["develop"]);


