import './style.css';
export default () => {
  const inquiryFormUrl = '/privacypolicy';
  return (
    <article>
      <br />
      <h3 className="title">よくある質問
        <hr />
      </h3>

      <div className="content">
        <h4>・配達に関して</h4>
        <p>Q.会員情報で事前に登録した住所ではない場所にお届けしたいのですが、指定方法がわかりません。</p>
        <p>A.ご注文の際に入力いただけます。</p>
        <p>Q.配達日の指定はできますか？</p>
        <p>A.ご購入の際に、ご購入確認画面から指定いただけます。</p>
      </div>

      <div className="content">
        <h4>・作品に関して</h4>
        <p>Q.過去の自分の作品は見れますか？</p>
        <p>A.ログイン後、メニューのマイ作品リストからご覧いただけます。</p>
      </div>

      <div className="content">
        <h4>・注文カートに関して</h4>
        <p>Q.商品の個数を変更できますか？</p>
        <p>A.カートの数量から変更できます。</p>
      </div>

      <div className="content">
        <h4>・会員情報に関して</h4>
        <p>Q.会員情報変更はできますか？</p>
        <p>A.ログイン後、メニューの会員情報から変更できます。</p>
      </div>


      <div className="linkButton">
        <p><button className="white_button" onClick={(e) => {
          e.preventDefault();
          window.location.href=`${inquiryFormUrl}`;
        }}>→お問い合わせ</button></p>
      </div>
      <br />


    </article>
  );
};
