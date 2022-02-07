const uuidv4 = require("uuid").v4;
//uuidから下12桁を取得
const rawUUID = uuidv4();
const uuid = rawUUID.substring(rawUUID.length - 12);
console.log(rawUUID);
console.log(uuid);