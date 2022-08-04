import {css} from '@emotion/react';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Header.css';
export default () => {
  return (
    <header className="header">
      <div className="logo">
        <h1><a href="/"><img src="images/logo.png" alt="ロゴ" /></a></h1>
      </div>
      <div className="headernakami">
        {/* 位置が上にずれすぎていて見えないので一時的に改行で誤魔化し */}
        <br />
        <br />
        <table className="toptable" cellPadding="5">
          <tr>
            <th>
              <input type="text" placeholder="キーワード検索" />
              <button onClick={undefined} name={'search'}>
                <FontAwesomeIcon css={css`pointer-events: none;`} icon={faMagnifyingGlass} />
              </button>
            </th>
          </tr>
          <tr>
            <div className="carticon15">
              <a href="/"><img src="images/cart-5.png" alt="ロゴ" /></a>
              {/* FontAwesome使うなら下 */}
              {/* <a href="/"><FontAwesomeIcon css={css`pointer-events: none;`} icon={faCartShopping} /></a> */}
            </div>
          </tr>
        </table>
        <form action="">
          <div className="cartsuuji">
            <p>1</p>
          </div>
        </form>
      </div>
    </header>
  );
};
