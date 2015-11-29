/// Required packages.
const path = require("path");
const babelify = require("babelify");
const browserify = require("browserify");
const browserifyShader = require("browserify-shader");
const watchify = require("watchify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const sequence = require("run-sequence");
const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");


/// Gulp & Plugins.
const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpif = require("gulp-if");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
var htmlMin = require('gulp-htmlmin');


gulp.task("lint", function () {
    var files = "src/**/*.js";
    gutil.log("Linting files:", files);
    return gulp.src(files)
        .pipe(buffer())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

/**
 * Bundles a set of files with a path, filename and production flag.
 * The flag controls whether to uglify the code and generate source maps.
 */
var bundle = function (bundler, path) {
    gutil.log("Bundling on:", gutil.colors.yellow(path));

    return bundler.bundle()
        .on("error", function (err) {
            gutil.log("Error bundling:", gutil.colors.red(err.message));
            this.emit("end");
        })
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(gulpif(process.env.isProduction === "true", uglify({mangle: false})))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path))
        .on("end", function () {
            gutil.log("Created bundle:", gutil.colors.green(path + "/bundle.js"));
        });
};


/**
 * Creates an app build task.
 */
gulp.task("build-sources", [], function () {
    var watch = !(process.env.isProduction === "true");
    var browserifyOptions = {
        entries     : "./src/main.js",
        debug       : true,
        cache       : {},
        packageCache: {}
    };

    var bundler = null;
    if (watch) {
        bundler = watchify(browserify(browserifyOptions))
    } else {
        bundler = browserify(browserifyOptions);
    }


    bundler
        .transform(babelify.configure({
            sourceMapRelative: __dirname + "/public/src",
            optional         : ["runtime"],
            compact          : false
        }))
        .transform(browserifyShader);

    if (watch) {
        bundler.on("update", function () {
            return bundle(bundler, "./dist");
        });
    }

    return bundle(bundler, "./dist");
});

gulp.task("build-html", [], function () {
    var options = {
        collapseWhitespace: true,
        removeComments    : true,
        caseSensitive     : true,
        minifyJS          : true,
        minifyCSS         : true

    };
    gulp.src("./index.html")
        .pipe(process.env.isProduction === "true" ? htmlMin(options) : gutil.noop())
        .pipe(gulp.dest('./dist'));
});


gulp.task("watch-html", function(done){
    // We watch the index page for changes
    gulp.watch(["./index.html"], ["build-html"]);
    done();
});

gulp.task("develop", [], function (done) {
    process.env.isProduction = false;
    return sequence(
        [
            "build-sources",
            "build-html",
            "watch-html"
        ],
        done
    );
});

gulp.task("build-production", [], function () {
    process.env.isProduction = true;
    sequence(["build-sources", "build-html"]);
});




