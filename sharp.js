const fs = require("fs");
const { Readable } = require("stream");
const sharp = require("sharp");
const through2 = require("through2");

const { glob, globSync, globStream, globStreamSync, Glob } = require("glob");
const { dest } = require("gulp");

// const readableStream = fs.createReadStream(
//   "images/david-emrich-X1Hozg__MiA-unsplash.jpg"
// );

// const writableStream = fs.createWriteStream("output/test.png");

// readableStream
//   .pipe(
//     through2({ objectMode: false }, function (chunk, enc, callback) {
//       if (chunk == undefined) return callback();
//       // console.log(chunk);
//     })
//   )
//   .pipe(sharp().resize(1920))
//   .pipe(writableStream);

// console.log(sharp("images/david-emrich-X1Hozg__MiA-unsplash.jpg"));

const images = glob(
  "images/**/*.{png,jpg}",
  { ignore: "node_modules/**" },
  async (err, matches) => {
    if (err) throw err;

    // await Promise.all(
    //   matches.map((el) => {
    //     fs.createReadStream(el)
    //       .pipe(
    //         sharp()
    //           .resize({
    //             width: 1920,
    //           })
    //           .png()
    //       )
    //       .pipe(
    //         through2(function (chunk, _, cb) {
    //           this.push(chunk);
    //           cb();
    //         })
    //       )
    //       .pipe(fs.createWriteStream(`outputs/images/${el.split("/").slice(1).join()}`));
    //   })
    // );

    await Promise.all([
      matches.forEach(async (el) => {
        const { width, icc } = await sharp(el).metadata();

        return sharp(el).resize({
          width: 1920,
        });
        // .toFile(`outputs/images/${el.split("/").slice(1).join()}`);
      }),
    ]);

    // await Promise.all(
    //   matches.map((el) => {
    //     return fs
    //       .createReadStream(el)
    //       .pipe(
    //         sharp()
    //           .resize({
    //             width: 1920,
    //           })
    //           .jpeg()
    //       )
    //       .pipe(fs.createWriteStream(`outputs/images/${el.split("/").slice(1).join()}`));
    //   })
    // );
  }
);

// .pipe(
//   through2(function (chunk, _, cb) {
//     this.push(chunk);
//     cb();
//   })
// )
