export{}
const bcrypt = require('bcrypt');
bcrypt.compareSync("hoge", hashed_password) // =>ture
bcrypt.compareSync("fake_hoge", hashed_password) // =>false
//見た感じ同期実行っぽい