const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          'https://e-learning-api-ruby.vercel.app/v1/auth/googleRedirect',
      },
      async function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
};
