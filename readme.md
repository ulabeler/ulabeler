# 導入
`sudo git clone -b master --recursive https://github.com/ulabeler/ulabeler.git`  
`npm install && npm run build`した後DBをいい感じにします。  
MySQL は別で動かしておく必要があります。  
 DB の初期化はしてないので今のところは SQLを自分で流してください  
 ただし、XAMPP についてくる MariaDB だとマイグレーションで死にます。  
 .env は git に上げないようにしてるので中身については聞いてください。  
 .env_sampleを見ればなんとなくわかると思います。  

### HEW2022以降で見ている人へ
 担当から渡されているであろうファイル群は多分作成途中です。  
 [Github](https://github.com/ulabeler/ulabeler)に最新のものを置いておくので、そちらを参考にしてください。  
 導入の所にもありますが、`--recursive`オプションを付けることで、サブモジュールまで一括で取得できます、  
 が諸々の事情でプライベートにしているかもしれません。

# メモ
1. 作品のサムネイルは512px*512px

# TODO

この後やる

- [ ] お問い合わせ機能
- [ ] ユーザー名も対象とした検索機能の実装
- [ ] https://github.com/na2na-p/ulabeler/issues/37
- [ ] public/javascripts以下のリファクタリング
- [ ] ルーティング関係のリファクタリング

# その他

- [ ] express-validator を利用したバリデーション API に切り替え
- [ ] [サインアップ] メールアドレスの重複不可検証 → これは送信ボタンを押した後にも行うこと。