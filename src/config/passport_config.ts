const passport = require("passport");
const LocalStrategy = require("passport-local");

// module.exports = function (app: any) {
//     passport.use(new LocalStrategy({
//         usernameField: "username",
//         passwordField: "password",
//     }, function (username:string, password:string, done:any) {
//     }
//     ));
// };