/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require("fs-extra");
const glob = require('glob');

const distDir = "./built";
cpDir(distDir);

// srcにある、コンパイルしないタイプのファイルをbuiltにコピーする
/**
 * @param {string} distDir
 */
function cpDir(distDir) {
  fse.copySync("./src/public/images", `${distDir}/public/images`);
  fse.copySync("./src/public/stylesheets", `${distDir}/public/stylesheets`);
  fse.copySync("./src/public/favicon.ico", `${distDir}/public/favicon.ico`);
  fse.copySync("./src/public/favicon.png", `${distDir}/public/favicon.png`);
  fse.copySync("./src/views", `${distDir}/views`);
  fse.copySync(
    "./src/tools/data/mailText.json",
    `${distDir}/tools/data/mailText.json`
  );

  glob('./src/public/javascripts/**/*.js', (err, files) => {
    console.log("Things that are not TypeScript")
    console.log(files);
    files.forEach(file => {
      // fileの末尾が.jsならばコピーする
      if (file.includes('/util')) {
        fse.copySync(file, `${distDir}/public/javascripts/util/${file.split('/')[5]}`);
      } else {
        fse.copySync(file, `${distDir}/public/javascripts/${file.split('/')[4]}`);
      }
    });
  });
}
