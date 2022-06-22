const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const { User } = require('../models');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log(jwt_payload);
    User.findOne({
      where: {
        id: jwt_payload.id,
        email: jwt_payload.email
      }
    })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport.authenticate('jwt', { session: false });
