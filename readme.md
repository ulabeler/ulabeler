# 現状
サンプルいっぱい入ってるので、後で消して実際のモノを入れていく流れです。 

# 導入
 `npm install`すれば必要なパッケージは入るはず。 
 ただし、.envはgitに上げないようにしてるので中身については聞いてください。 
 TypeScriptで書いたブツに関してはコンパイルの必要があります。

# メモ
MySQLWorkbench関係のファイルも追加しています。以降の編集はここからやります。

# TODO
- [ ] [データベース]やり取りの履歴を残す目的で、descriptionとreplyをJSON型へ変更する。TS型定義は済
- [ ] [データベース]ハッシュタグをJSON型へ変更する。TS型定義の変更は済
- [ ] [サインアップ] 登録操作後、クッションページを入れる
- [x] [サインアップ] メールアドレスのバリデーションがはたらいてない疑惑
- [ ] [サインアップ] 重複不可部分のリアルタイム判定用API作り
- [ ] [サインアップ] フォーム全体の動作作り
- [ ] [サインアップ] フォームのバリデーション
- [ ] [サインアップ] フォームのバリデーションのエラーメッセージ
- [ ] [パスワードリセット] ファイル名変更とURIの設定(mail_address_input→password_forgottenとか)
- [ ] [優先度:高] α版専用挙動の除去 https://github.com/na2na-p/ulabeler/issues/2
- [ ] [決済]PayPayの組み込み
- [ ] 「画像アップロード」と名前を付けた機能関係の保管先どうする問題
- [ ] [Webページ]素体選択画面の受け渡しに用いるメソッド関係の整理
- [ ] [Webページ]ブラウザの戻る機能で戻したときに、GETでアクセスされるので壊れる問題 → ほんとか？
- [ ] https://github.com/na2na-p/ulabeler/issues/1
- [ ] work_settingsの受け渡しまわり
- [x] [サインアップ] 届いたメールを確認してアクティベーションする操作挟むべきでは？ →不要
- [x] [フィルター]下に出ているサンプルを、すでに効果適用されたものに差し替えておく
- [x] work_settingsの作品名/作品説明文にidが欲しい
- [x] .envを.sample.envとしてgithubへ投げる
- [x] [DB]base_category.name_subcategoryのNullAbleを禁止にする