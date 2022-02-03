# 現状
サンプルいっぱい入ってるので、後で消して実際のモノを入れていく流れです。 

# 導入
 `npm run test`すればとりあえずは起動します。MySQLは別で動かしておく必要があります。 
 DBの初期化はしてないので今のところはSQL自分で流してください 
 ただし、.envはgitに上げないようにしてるので中身については聞いてください。 
 TypeScriptで書いたブツに関してはコンパイルの必要があります。 

# メモ
MySQLWorkbench関係のファイルも追加しています。以降の編集はここからやります。
1. ログアウト時に、確認メッセージを出す|出さない
1.

# TODO

この後やる
- [x] ログアウト
- [ ] メールアドレス変更
- [ ] パスワード変更
- [ ] 退会

- [ ] [メールアドレス変更] 確認コード入力欄どうすんの？
- [ ] [パスワードリセット] パスワードリセット後の画面どうするか
- [ ] [パスワードリセット] トークンをn重に生成した場合はすでにあったものを消去すべき
- [ ] [データベース]やり取りの履歴を残す目的で、descriptionとreplyをJSON型へ変更する。TS型定義は済
- [ ] [データベース]ハッシュタグをJSON型へ変更する。TS型定義の変更は済
- [ ] [サインアップ] 登録操作後、クッションページを入れる
- [ ] [サインアップ] メールアドレスの重複不可検証→これは送信ボタンを押した後に行うこと。
- [ ] [優先度:高] α版専用挙動の除去 https://github.com/na2na-p/ulabeler/issues/2
- [ ] [決済]PayPayの組み込み
- [ ] 「画像アップロード」と名前を付けた機能関係の保管先どうする問題
- [ ] [Webページ]素体選択画面の受け渡しに用いるメソッド関係の整理
- [ ] [Webページ]ブラウザの戻る機能で戻したときに、GETでアクセスされるので壊れる問題 → ほんとか？
- [ ] https://github.com/na2na-p/ulabeler/issues/1
- [ ] work_settingsの受け渡しまわり
- [x] [サインアップ] 重複不可部分のリアルタイム判定用API作り
- [x] [サインアップ] フォーム全体の動作作り
- [x] [サインアップ] フォームのバリデーション
- [x] [サインアップ] フォームのバリデーションのエラーメッセージ
- [x] [パスワードリセット] トークン期限切れ時の挙動再確認。消してる？アクセスしたらどう表示されてる？
- [x] [パスワードリセット] ファイル名変更とURIの設定(mail_address_input→password_forgottenとか)
- [x] [パスワードリセット] メールから飛んだ時に、期限切れ、トークンエラーの場合のエラー表示をする
- [x] [サインアップ] メールアドレスのバリデーションがはたらいてない疑惑
- [x] [サインアップ] 届いたメールを確認してアクティベーションする操作挟むべきでは？ →不要
- [x] [フィルター]下に出ているサンプルを、すでに効果適用されたものに差し替えておく
- [x] work_settingsの作品名/作品説明文にidが欲しい
- [x] .envを.sample.envとしてgithubへ投げる
- [x] [DB]base_category.name_subcategoryのNullAbleを禁止にする
