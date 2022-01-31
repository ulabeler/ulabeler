const fse = require('fs-extra');

cp_dir();

function cp_dir(){
fse.copySync('./public', './built/public');
fse.copySync('./views', './built/views');
fse.copySync('./tools/data/mailText.json', './built/tools/data/mailText.json');
}