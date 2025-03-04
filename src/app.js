require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { passport, ensureAuthenticated } = require('./auth');
const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.get('/auth/openid/return', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Apply the ensureAuthenticated middleware to all routes
app.use(ensureAuthenticated);

// Use the index router for the root path
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});