const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/user")
const opts = {}

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = "jhdshhds884hfhhs-ew6dhjd"

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Check against the DB only if necessary.
    // This can be avoided if you don't want to fetch user details in each request.
    User.findOne({ _id: jwt_payload.user_id }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
        // or you could create a new account
      }
    })
    

  })
)

