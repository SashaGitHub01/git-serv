const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function (user, done) {
   done(null, user);
});

passport.deserializeUser(function (obj, done) {
   done(null, obj);
});

passport.use(new GitHubStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: `${process.env.SERVER}/auth/callback`
},
   function (accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      if (profile) {
         return done(null, profile)
      } else {
         return done(null, false)
      }
   }
));
