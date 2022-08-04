import './Footer.css';

export default () => {
  return (
    <footer>
      <div className='footerDiv'>
        <table className='footerTable'>
          <tr>
            <td>
              <p><a href="/faq">よくある質問</a></p>
            </td>
            <td>
              <p><a href="/privacypolicy">プライバシーポリシー</a></p>
            </td>
            <td>
              <p><a href="/sitepolicy">サイトポリシー</a></p>
            </td>
          </tr>
        </table>
      </div>
    </footer>
  );
};
