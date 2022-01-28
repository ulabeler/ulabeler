const bcrypt = require('bcrypt');
const password:string = "hoge";
let hashed_password:string = bcrypt.hashSync(password, 10);
console.log(hashed_password);