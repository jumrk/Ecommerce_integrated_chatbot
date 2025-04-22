const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../model/User");
require("dotenv").config();
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {

            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // If user exists, update Google ID if not already set
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }
                } else {
                    // If user does not exist, create a new user
                    user = new User({
                        fullName: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        avatar: profile.photos[0].value,
                        isActive: true,
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/api/auth/facebook/callback",
            profileFields: ["id", "displayName", "emails", "photos"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value || "";
                const phone = profile.phone?.[0]?.value || "";

                let user = await User.findOne({
                    $or: [{ email: email }, { phone: phone }, { facebookId: profile.id }]
                });

                if (user) {
                    if (!user.facebookId) {
                        user.facebookId = profile.id;
                        await user.save();
                    }
                } else {
                    user = new User({
                        fullName: profile.displayName,
                        email: email,
                        phone: phone,
                        facebookId: profile.id,
                        avatar: profile.photos?.[0]?.value || "",
                        isActive: true,
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

module.exports = passport;
