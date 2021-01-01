const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
require('./db/mongoose')
const User = require('./models/user')
const SNSCredentials = require('./models/sns-credentials')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id)
    if (!user) {
        return done(null, false, {message: 'False to deserialize'})
    }
    done(null, user);
});

passport.use(new LocalStrategy(
    {
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email, password, done) => {
        const user = await User.findOne({ email })
        if (!user) {
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Unable to login')
        }
        return done(null, user,{ message: 'Success' });
    }
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_KEY_SECRET,
    callbackURL: "/api/auth/twitter/callback",
    includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => { 
        console.log(token)
        const sns = await SNSCredentials.findByCredentials(profile.provider + profile.id)
        // const checkUser = await User.findOne({email: profile.emails[0].value})
        if (sns) {
                const user = await User.findById(sns.user)
                // const token = await user.generateAuthToken()
                await user.save()
                done(null, user, { message: 'Authorized' });
        } else {
            const user = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: profile.displayName + profile.emails[0].value + Date.now,
                avatar: profile.photos[0].value,
            })
            const sns = new SNSCredentials({
                providerId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                provider: profile.provider,
                avatar: profile.photos[0].value,
                id: profile.provider + profile.id,
                user: user._id
            })
            await user.save()
            await sns.save()
            done(null, user, { message: 'new User created' });
        }
    }
));

passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_KEY_SECRET,
    callbackURL: "http://127.0.0.1:3000/connect/twitter/callback",
    passReqToCallback: true
  },
  function(token, tokenSecret, profile, done) {
    SNSCredentials.findOne(
        { id: profile.provider + profile.id }, 
        async (err, account) => {
            if (err) { return done(err); }
            if (account) {return done(null, account); }

            // var user = new SNSCredentials({
            //     providerId: profile.id,
            //     username: profile.displayName,
            //     email: profile.emails[0].value,
            //     provider: profile.provider,
            //     avatar: profile.photos[0].value,
            //     id: profile.provider + profile.id,
            //     user: user._id
            // })
            var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };
            account.tokens.push(t);
      return done(null, account);
    });
  }
));