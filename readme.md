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
 導入の所にもありますが、`--recursive`オプションを付けることで、サブモジュールまで一括で取得できます。

# メモ
1. 作品のサムネイルは512px*512px
1. 購入手続きの前にカートに加える処理だけ生やしておきたい。APIから書く必要がある。

# TODO

この後やる

- [ ] お問い合わせ機能
- [ ] ユーザー名も対象とした検索機能の実装
- [ ] https://github.com/na2na-p/ulabeler/issues/37
- [ ] public/javascripts以下のリファクタリング
- [ ] ルーティング関係のリファクタリング
- [ ] トップ差し替え
- [ ] 素体選択アイフォンcolor.jpeg差し替えお願い

# その他

- [ ] express-validator を利用したバリデーション API に切り替え
- [ ] 住所はどのタイミングで DB に投げますか。→ 確定前の再編集を考慮すべき
- [ ] [サインアップ] メールアドレスの重複不可検証 → これは送信ボタンを押した後にも行うこと。
- [ ] [決済]PayPay の組み込み
- [x] 作者ページのアイコン角丸になってない
- [x] [データベース]やり取りの履歴を残す目的で、description と reply を JSON 型へ変更する。TS 型定義は済
- [x] [データベース]ハッシュタグを JSON 型へ変更する。TS 型定義の変更は済 → インデックス貼らずにやってる
- [x] お気に入りユーザーリスト全般
- [x] https://github.com/na2na-p/ulabeler/issues/33
- [x] 作品情報編集画面のバリデーション機構の分離とそれを担当に渡す
- [x] 作品を登録時に favorited_work_number も自動で登録するようにしないとコケる→依頼済み
- [x] [作者ページ] 通報ボタン出し分け(isMine の利用)、画像サムネイル小さすぎる問題の対応
- [x] [メールアドレス変更] 確認コード入力欄どうすんの？
- [x] [パスワードリセット] パスワードリセット後の画面どうするか
- [x] [パスワードリセット] トークンを n 重に生成した場合はすでにあったものを消去すべき
- [x] [優先度:高] α 版専用挙動の除去 https://github.com/na2na-p/ulabeler/issues/2
- [x] [サインアップ] 登録操作後、クッションページを入れる
- [x] [サインアップ] 重複不可部分のリアルタイム判定用 API 作り
- [x] [サインアップ] フォーム全体の動作作り
- [x] [サインアップ] フォームのバリデーション
- [x] [サインアップ] フォームのバリデーションのエラーメッセージ
- [x] [パスワードリセット] トークン期限切れ時の挙動再確認。消してる？アクセスしたらどう表示されてる？
- [x] [パスワードリセット] ファイル名変更と URI の設定(mail_address_input→password_forgotten とか)
- [x] [パスワードリセット] メールから飛んだ時に、期限切れ、トークンエラーの場合のエラー表示をする
- [x] [サインアップ] メールアドレスのバリデーションがはたらいてない疑惑
- [x] [サインアップ] 届いたメールを確認してアクティベーションする操作挟むべきでは？ → 不要
- [x] [フィルター]下に出ているサンプルを、すでに効果適用されたものに差し替えておく
- [x] work_settings の作品名/作品説明文に id が欲しい
- [x] .env を.sample.env として github へ投げる
- [x] [DB]base_category.name_subcategory の NullAble を禁止にする
