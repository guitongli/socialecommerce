const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

const db = require('./db');
const cookieSession = require('cookie-session');
const bc = require('./bc.js');
const csurf = require('csurf');
// const bodyParser = require("body-parser");
// const {
//     checkLoggedIn,
//     checkExisting,
//     checkLoggedOut,
//     checkNotSigned,
//     checkSigned,
// } = require("./middleware");

let cookie_sec;

var csrfProtection = csurf();

if (process.env.COOKIE_SECRET) {
    cookie_sec = process.env.COOKIE_SECRET;
} else {
    cookie_sec = require('./secrets.json').cookie_secret;
}

app.use(
    cookieSession({
        secret: cookie_sec,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    })
);
app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
});

app.post('/signup', (req, res) => {
    const { firstname, lastname, password, email } = req.body;
    console.log(req.session);
    if (!firstname || !lastname || !password || !email) {
        res.json({ error: true });
    } else {
        hash(keys)
            .then(hashedkeys => {
                return db
                    .insertUser(firstname, lastname, email, hashedkeys)
                    .then(returns => {
                        req.session.userID = returns.rows[0].id;
                        var currentID = returns.rows[0].id;
                        req.session.userID = currentID;
                        res.json({success:true});
                        res.end();
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({success:false});
                    });
            })
            .catch(err => {
                console.log(err);
                res.render('signup', {
                    layout: 'landing_signup',
                    internalErr: true,
                    csrfToken: req.csrfToken()
                });
                res.end();
            });
    }
});
app.get('*', function(req, res) {
    if (req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
});

app.listen(process.env.PORT || 3001, function() {
    console.log("I'm listening.");
});
