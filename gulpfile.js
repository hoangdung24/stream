const fs = require("fs");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const beautify = require("gulp-beautify");
const sharp = require("sharp");
const through2 = require("through2");
const { series, src, dest, parallel } = require("gulp");
const imageResize = require("gulp-image-resize");

const { Buffer, File } = require("buffer");

// fs.createReadStream("?", { encoding: "" });

function jsTask() {
  return src("sample/*.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(beautify())
    .pipe(dest("output/"));
}

// .pipe(
//   through2({ objectMode: true }, function (chunk, enc, callback) {
//     console.log(chunk);
//     callback();
//   })
// )

function imageTask() {
  return src("images/*.jpg")
    .pipe(
      imageResize({
        width: 100,
        upscale: false,
      })
    )
    .pipe(dest("output/images/"));
  // .pipe(sharp().resize(1920));
}

exports.default = parallel(jsTask, imageTask);

// .pipe(
//   through2(
//     {
//       objectMode: true,
//     },
//     function (chunk, enc, callback) {
//       console.log(chunk);

//       callback();
//     }
//   )
// );

// .pipe(
//   imagemin([
//     imagemin.gifsicle({ interlaced: true }),
//     imagemin.mozjpeg({ quality: 75, progressive: true }),
//     imagemin.optipng({ optimizationLevel: 5 }),
//     imagemin.svgo({
//       plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
//     }),
//   ])
// )
