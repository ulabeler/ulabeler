const fse = require('fs-extra');

//もし、builtフォルダがある場合は削除する
if(fse.existsSync('./built')){
    //メソッドチェーンを用いる
    fse.removeSync('./built');
    console.log('builtを再生成');
}

cp_dir();

function cp_dir(){
fse.copySync('./public', './built/public');
fse.copySync('./views', './built/views');
}