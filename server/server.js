const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');

const db = require('./db');
const cookieSession = require('cookie-session');
const { hash, compare } = require("./bc");
const csrf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
});
// const bodyParser = require("body-parser");
// const {
//     checkLoggedIn,
//     checkExisting,
//     checkLoggedOut,
//     checkNotSigned,
//     checkSigned,
// } = require("./middleware");
let cookie_sec;
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
app.use(csrf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


// var csrfProtection = csurf();



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
    // req.session.csrfSecret = null;
    console.log(req.body);
    // if (!firstname || !lastname || !password || !email) {
    //     res.json({ error: true });
    // } else {
    //     hash(keys)
    //         .then(hashedkeys => {
    //             return db
    //                 .insertUser(firstname, lastname, email, hashedkeys)
    //                 .then(returns => {
    //                     req.session.userID = returns.rows[0].id;
    //                     var currentID = returns.rows[0].id;
    //                     req.session.userID = currentID;
    //                     res.json({success:true});
    //                     res.end();
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                     res.json({success:false});
    //                 });
    //         })
    //         .catch(err => {
    //             console.log(err);
                
    //             res.end();
    //         });
    // }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({success:false})
    } else {
        db.getInfo(email)
            .then((info) => {
                const hashkeys = info.rows[0].hashkeys;
                req.session.userID = info.rows[0].id;
                currentID = info.rows[0].id;
                console.log("loggedid", info.rows[0].id);
                console.log(req.session.userID);
                compare(keys, hashkeys)
                    .then((result) => {
                        if (result == true) {
                            db.getImg(info.rows[0].id)
                                .then((signature) => {
                                    console.log(
                                        "verified",
                                        req.session.userID,
                                        info.rows[0].id
                                    );
                                    // res.redirect("/petition");
                                    if (signature.rows[0].canvasimg) {
                                        req.session.signature =
                                            signature.rows[0].canvasimg;
                                        console.log(
                                            "sigeed id",
                                            req.session.userID
                                        );

                                        res.redirect("/thanks");
                                    } else {
                                        res.redirect("/petition");
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.redirect("/petition");
                                });
                        } else {
                            res.render("login", {
                                layout: "forlogin",
                                incomplete: true,
                                csrfToken: req.csrfToken(),
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.render("login", {
                    layout: "forlogin",
                    nonexist: true,
                    csrfToken: req.csrfToken(),
                });
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
