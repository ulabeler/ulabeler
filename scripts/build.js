const fse = require('fs-extra');

//もし、builtフォルダがある場合は削除する
if(fse.existsSync('./built')){
    fse.removeSync('./built');
    console.log('builtディレクトリを再生成します。');
}

cp_dir();

function cp_dir(){
fse.copySync('./public', './built/public');
fse.copySync('./views', './built/views');
fse.copySync('./tools/data/mailText.json', './built/tools/data/mailText.json');
}