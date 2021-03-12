const express = require('express');
const app = express();
const compression = require('compression');
const path = require('path');
const { s3Email, s3Upload } = require('./s3');
const { s3Url } = require('./config.json');
const db = require('./db');
const cookieSession = require('cookie-session');
const { hash, compare } = require('./bc');
const csrf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const secretCode = cryptoRandomString({
    length: 6
}); 

const multer = require('multer');
const uidSafe = require('uid-safe'); 

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
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

app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});

// var csrfProtection = csurf();

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.get('/welcome', (req, res) => {
    if (req.session.username) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
});

app.post('/signup', (req, res) => {
    const { username, yourname, password, email } = req.body;
    // req.session.csrfSecret = null;
    console.log(req.body);
    if (!username || !yourname || !password || !email) {
        res.json({ error: true });
    } else {
        hash(password)
            .then(hashedkeys => {
                return db
                    .insertUser(username, yourname, email, hashedkeys)
                    .then(returns => {
                        console.log('inserted user to db', returns);
                        req.session.userEmail = email; 
                        res.json({ success: true });
                        res.end();
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({ success: false });
                    });
            })
            .catch(err => {
                console.log(err);

                res.end();
            });
    }
});

app.post('/login', (req, res) => {
    // console.log(csrfToken);
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ success: false });
    } else {
        db
            .checkUser(email)
            .then(info => {
                const hashkeys = info.rows[0].hashkeys;

                compare(password, hashkeys)
                    .then(result => {
                        if (result == true) {
                            req.session.userEmail = info.rows[0].email;
                            req.session.username= info.rows[0].username;
                            console.log(req.session);
                            // res.json({succes:true})

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
               
            });
    }
});

app.post('/verification/sendemail', (req, res) => {
    console.log('sendemail', req.body);
    db
        .checkEmail(req.body.email)
        .then(result => {
            if (result.rows[0].count) {
                db
                    .getName(req.body.email)
                    .then(result => {
                        s3Email(result.rows[0].yourname, 'guitong.lee.contact@gmail.com', secretCode).then(result => {
                            res.json({ success: true });
                        });

                        db.insertCode(req.body.email, secretCode).then(result => console.log(result));
                    })
                    .catch(err => res.json({ success: false }));
            }
        })
        .catch(err => console.log(err));
});


app.post('/verification', (req, res) => {
    console.log(req.body);
    db.getCode(req.body.email).then(result => {
        console.log(result);
        if (result.rows[0].code == secretCode) {
            res.json({ success: true });
        }
    });
});

app.post('/verification/updatepassword', (req, res) => {
    hash(req.body.password).then(hashedkeys => {
        return db
            .updatePassword(req.body.email, hashedkeys)
            .then(returns => {
                res.json({ success: true });
            })
            .catch(err => {
                console.log(err);
                res.json({ success: false });
            });
    });
});

app.get('/user', (req, res) => {
    console.log(req.session.userEmail);
    db.getName(req.session.userEmail).then(result => {
        res.json(result.rows[0]);
    });
});
app.post('/avatar', uploader.single('file'), s3Upload, (req, res) => {
    // if (req.file) {
    //     res.json({ succes: true });
    // } else {
    //     res.json({ success: false });
    //     console.log("why");
    // }
    console.log('file', req.file, 'body', req.body);

    const {username } = req.body;
    if (req.file.size > 300000) {
        res.sendStatus('oversize');
    }
    const { filename } = req.file;
    db
        .insertImg(s3Url + filename, username)
        .then(result => {
            db
                .getImgs()
                .then(result => {
                    //    res.json(result.rows);
                    res.redirect('/gallery');
                })
                .catch(err => {
                    console.log('cant send updated photos', err);
                });
        })
        .catch(err => {
            console.log('save to db problem', err);
        });
});

app.get('*', function(req, res) {
    if (!req.session.userEmail) {
        res.redirect('/welcome');
    } else {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    }
});

app.listen(process.env.PORT || 3001, function() {
    console.log("I'm listening.");
});
