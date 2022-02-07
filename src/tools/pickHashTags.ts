function pickHashTags(text:string){
    let hashTag: string[] = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "#") {
            let j = i;
            while (text[j] !== " " && text[j] !== "　" && text[j] !== "," && text[j] !== "." && text.length !== j) {
                j++;
            }
            let tag = text.slice(i, j);
            hashTag.push(tag);
        }
    }
    //descriptionから、hashTagの要素を除去
    for (let i = 0; i < hashTag.length; i++) {
        //hashTagの要素の直後に"\r\n"があれば、それも除去する
        if (text.indexOf(hashTag[i]) !== -1) {
            if (text.indexOf("\r\n", text.indexOf(hashTag[i])) !== -1) {
                text = text.slice(0, text.indexOf(hashTag[i])) + text.slice(text.indexOf("\r\n", text.indexOf(hashTag[i])) + 2);
            } else {
                text = text.slice(0, text.indexOf(hashTag[i])) + text.slice(text.indexOf(hashTag[i]) + hashTag[i].length);
            }
        }
    }
    //descriptionの先頭に、\r\nがあれば除去する
    if (text.startsWith("\r\n")) {
        text = text.slice(2);
    }
    // //descriptionの末尾に、\r\nがあれば除去する
    if (text.endsWith("\r\n")) {
        text = text.slice(0, text.length - 2);
    }

    const result = {
        text: text,
        hashTag: hashTag,
    }

    return result;
}

export { pickHashTags };