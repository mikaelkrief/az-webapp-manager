const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
    clientID: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    responseType: 'code',
    responseMode: 'query',
    redirectUrl: process.env.AZURE_REDIRECT_URI,
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
    passReqToCallback: false,
    scope: ['profile', 'offline_access', 'https://graph.microsoft.com/user.read']
}, (iss, sub, profile, accessToken, refreshToken, done) => {
    return done(null, profile);
}));

const ensureAuthenticated = (req, res, next) => {
    if (process.env.AUTHENTICATION_ENABLED === 'true') {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = {
    passport,
    ensureAuthenticated
};