# 導入
`sudo git clone -b master --recursive https://github.com/ulabeler/ulabeler.git`  
`npm install && npm run build`した後DBをいい感じにします。MySQL は別で動かしておく必要があります。  
 DB の初期化はしてないので今のところは SQL 自分で流してください  
 ただし、XAMPP についてくる MariaDB だとマイグレーションで死にます。  
 .env は git に上げないようにしてるので中身については聞いてください。  
 .env_sampleを見ればなんとなくわかると思います。

# メモ
1. 作品のサムネイルは512px*512px

# TODO

この後やる

- [x] 作品取り出すときに、is_publicが反映されるようにする #56
- [ ] ダミー作品データのサムネイルを512*512の適当なものに差し替え
- [ ] トップページのライブラリ機能
- [ ] お問い合わせ機能
- [ ] 注文履歴のダミーデータ追加
- [ ] 注文履歴のルーティング処理追加
- [ ] ユーザー名も対象とした検索機能の実装
- [ ] https://github.com/na2na-p/ulabeler/issues/37
- [ ] @ryota658 作業分と統合する作業
- [ ] public/javascripts以下のリファクタリング
- [ ] ルーティング関係のリファクタリング

# その他

- [ ] express-validator を利用したバリデーション API に切り替え
- [ ] 作者ページのアイコン角丸になってない
- [ ] 住所はどのタイミングで DB に投げますか。→ 確定前の再編集を考慮すべき
- [ ] [データベース]やり取りの履歴を残す目的で、description と reply を JSON 型へ変更する。TS 型定義は済
- [ ] [データベース]ハッシュタグを JSON 型へ変更する。TS 型定義の変更は済
- [ ] [サインアップ] メールアドレスの重複不可検証 → これは送信ボタンを押した後にも行うこと。
- [ ] [決済]PayPay の組み込み
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
