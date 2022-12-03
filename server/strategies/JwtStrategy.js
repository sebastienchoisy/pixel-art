const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const opts = {}

// custom extractor
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req?.cookies?.jwt) {
      token = req.cookies.jwt;
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = process.env.JWT_SECRET

// Stratégie JWT, on utilise un extractor custom pour récupérer le token dans les cookies, on vérifie ensuite avec le token
// décodé que le payload de celui ci correspond bien à un utilisateur.
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.user_id, role: jwt_payload.role}, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    

  })
)

