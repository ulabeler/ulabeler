/* eslint-disable @typescript-eslint/no-var-requires */
const fse = require("fs-extra");

const distDir = "./built";
cpDir(distDir);
// srcにある、コンパイルしないタイプのファイルをbuiltにコピーする
/**
 * @param {string} distDir
 */
function cpDir(distDir) {
  fse.copySync("./src/public", `${distDir}/public`);
  fse.copySync("./src/views", `${distDir}/views`);
  fse.copySync(
    "./src/tools/data/mailText.json",
    `${distDir}/tools/data/mailText.json`
  );
}
