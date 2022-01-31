const fse = require('fs-extra');

cp_dir();

function cp_dir(){
fse.copySync('./src/public', './built/public');
fse.copySync('./src/views', './built/views');
fse.copySync('./src/tools/data/mailText.json', './built/tools/data/mailText.json');
}