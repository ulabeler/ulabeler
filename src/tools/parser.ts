/* eslint-disable no-irregular-whitespace */
// 渡されたテキストから、ハッシュタグ(配列)とそれ以外を分けて返す
/**
 * @param {string} text テキスト
 * @return {[string, string]} ハッシュタグとそれ以外
 */
function pickHashTags(text: string) {
  const hashTag: string[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "#") {
      let j = i;
      while (
        text[j] !== " " &&
        text[j] !== "　" &&
        text[j] !== "," &&
        text[j] !== "." &&
        text.length !== j
      ) {
        j++;
      }
      const tag = text.slice(i, j);
      hashTag.push(tag);
    }
  }
  // descriptionから、hashTagの要素を除去
  for (let i = 0; i < hashTag.length; i++) {
    // hashTagの要素の直後に"\r\n"があれば、それも除去する
    if (text.indexOf(hashTag[i]) !== -1) {
      if (text.indexOf("\r\n", text.indexOf(hashTag[i])) !== -1) {
        text =
          text.slice(0, text.indexOf(hashTag[i])) +
          text.slice(text.indexOf("\r\n", text.indexOf(hashTag[i])) + 2);
      } else {
        text =
          text.slice(0, text.indexOf(hashTag[i])) +
          text.slice(text.indexOf(hashTag[i]) + hashTag[i].length);
      }
    }
  }

  // hashTagの末尾にある"\r\n"を除去
  for (let i = 0; i < hashTag.length; i++) {
    if (hashTag[i].indexOf("\r\n") !== -1) {
      hashTag[i] = hashTag[i].slice(0, hashTag[i].indexOf("\r\n"));
    }
  }

  // descriptionの先頭に、\r\nがあれば除去する
  if (text.startsWith("\r\n")) {
    text = text.slice(2);
  }
  // //descriptionの末尾に、\r\nがあれば除去する
  if (text.endsWith("\r\n")) {
    text = text.slice(0, text.length - 2);
  }

  // eslint-disable-next-line no-irregular-whitespace
  // textの末尾に" "や"　"があれば、それも除去する
  while (text.endsWith(" ") || text.endsWith("　")) {
    text = text.slice(0, text.length - 1);
  }

  const result = {
    text: text,
    hashTag: hashTag,
  };

  return result;
}

// 渡されたテキストから、検索ワードとして使えるようにスペースで区切って配列にして返す
/**
 * @param {string} text テキスト
 * @return {string[]} 検索ワード
 */
function searchWordParse(text: string): string[] {
  // textを" "や"　"で区切って配列に格納する
  const textArray = text.split(/[\x20\u3000]/g);
  return textArray;
}

export { pickHashTags, searchWordParse };
