const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { s3Email, s3Upload } = require("./s3");
const { s3Url } = require("./config.json");
const db = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const csrf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6,
});

const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
app.use(express.urlencoded({ extended: false }));

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
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
    cookie_sec = require("./secrets.json").cookie_secret;
}

app.use(
    cookieSession({
        secret: cookie_sec,
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
    })
);
app.use(csrf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// var csrfProtection = csurf();

app.use(express.json());

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.post("/signup", (req, res) => {
    const { username, yourname, password, email } = req.body;
    // req.session.csrfSecret = null;
    console.log(req.body);
    if (!username || !yourname || !password || !email) {
        res.json({ error: true });
    } else {
        hash(password)
            .then((hashedkeys) => {
                return db
                    .insertUser(username, yourname, email, hashedkeys)
                    .then((returns) => {
                        console.log("inserted user to db", returns);
                        req.session.userEmail = email;
                        res.json({ success: true });
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log(err);

                res.end();
            });
    }
});

app.post("/login", (req, res) => {
    // console.log(csrfToken);
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ success: false });
    } else {
        db.checkUser(email)
            .then((info) => {
                const hashkeys = info.rows[0].hashkeys;

                compare(password, hashkeys)
                    .then((result) => {
                        if (result == true) {
                            console.log(info.rows[0]);
                            req.session.userEmail = info.rows[0].email;
                            req.session.username = info.rows[0].username;
                            req.session.userId = info.rows[0].id;
                            console.log(req.session);
                            res.json({ success: true });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false });
            });
    }
});

app.post("/verification/sendemail", (req, res) => {
    console.log("sendemail", req.body);
    db.checkEmail(req.body.email)
        .then((result) => {
            if (result.rows[0].count) {
                db.getEmail(req.body.email)
                    .then(({ rows }) => {
                        s3Email(
                            rows[0].yourname,
                            "guitong.lee.contact@gmail.com",
                            secretCode
                        ).then((result) => {
                            res.json({ success: true });
                        });

                        db.insertCode(
                            req.body.email,
                            secretCode
                        ).then((result) => console.log(result));
                    })
                    .catch((err) => res.json({ success: false }));
            }
        })
        .catch((err) => console.log(err));
});

app.post("/verification", (req, res) => {
    console.log(req.body);
    db.getCode(req.body.email).then(({ rows }) => {
        console.log(rows);
        if (rows[0].code == secretCode) {
            res.json({ success: true });
        }
    });
});

app.post("/verification/updatepassword", (req, res) => {
    hash(req.body.password).then((hashedkeys) => {
        return db
            .updatePassword(req.body.email, hashedkeys)
            .then((returns) => {
                res.json({ success: true });
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false });
            });
    });
});

app.get("/api/user", (req, res) => {
    console.log(req.session.userEmail);
    db.getEmail(req.session.userEmail).then(({ rows }) => {
        res.json(rows[0]);
    });
});

app.get("/api/:id", (req, res) => {
    db.getId(req.params.id)
        .then((result) => {
            res.json(result.rows[0]);
            if (req.session.username == req.params.username) {
                res.redirect("/");
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
app.get("/search/recent", (req, res) => {
    db.getRecent()
        .then((result) => res.json(result.rows))
        .catch((err) => {
            console.log("recent", err);
            res.json({ success: false });
        });
});
app.get("/search/search/:input", (req, res) => {
    const input = req.params.input;
    console.log("input", input);
    db.search(input)
        .then((result) => res.json(result.rows))
        .catch((err) => console.log("search", err));
});

// app.get('/user/:username', (req,res)=>{
//     console.log(req.params.username);
//     db.getName(req.params.username).then(result =>{
//          res.json(result.rows[0]);
//     }).catch(err=>{console.log(err);
//     res.redirect('/welcome')});
//     if (req.session.username == req.params.username) {
//         res.redirect('/');
//     }
// });
app.post("/save/avatar", uploader.single("file"), s3Upload, (req, res) => {
    // if (req.file) {
    //     res.json({ succes: true });
    // } else {
    //     res.json({ success: false });
    //     console.log("why");
    // }

    console.log("file", req.file, "body", req.body);

    const { username } = req.body;
    if (req.file.size > 300000) {
        res.sendStatus("oversize");
    }
    const { filename } = req.file;
    db.insertImg(s3Url + filename, username)
        .then(({ rows }) => {
            console.log(rows);
            res.json({ success: true, pic: s3Url + filename });
        })
        .catch((err) => {
            console.log("save to db problem", err);
        });
});
app.post("/save/bio", (req, res) => {
    const { username, bio } = req.body;
    console.log(username, bio);
    db.insertBio(bio, username)
        .then(({ rows }) => {
            console.log(rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("save to bio problem", err);
        });
});

app.get("/friend/:method/:hisId", (req, res) => {
    const { hisId, method } = req.params;
    const yourId = req.session.userId;
    console.log("ids", yourId, hisId, method);
    if (method == "check") {
        console.log("checking");
        db.checkFriendship(yourId, hisId)
            .then(({ rows }) => {
                if (!rows[0]) {
                    res.json({ stage: "follow" });
                } else {
                    console.log(rows[0]);
                    if (
                        rows[0].accepted == false &&
                        rows[0].sender_id == yourId
                    ) {
                        console.log("pending here");
                        res.json({ stage: "sent" });
                    } else if (
                        rows[0].accepted == false &&
                        rows[0].recipient_id == yourId
                    ) {
                        console.log("pending here 2");
                        res.json({ stage: "accept request" });
                    } else if (rows[0].accepted == true) {
                        res.json({ stage: "following" });
                    }
                }
            })
            .catch((err) => console.log(err));
    } else if (method == "make") {
        db.makeFriendship(yourId, hisId).then(({ rows }) => {
            if (rows[0].id) {
                res.json({ stage: "sent" });
            }
        });
    } else if (method == "break") {
        db.breakFriendship(yourId, hisId).then(({ rows }) => {
            console.log(rows);
            // if(rows[0].id){
            res.json({stage:'follow'});
        });
    } else if (method == "accept") {
        db.acceptFriendship(yourId, hisId).then(({ rows }) => {
            console.log(rows);
            // if(rows[0].id){
            res.json({stage:'following'});
        });
    }
});

app.get("/unlog", (req, res) => {
    console.log(req.session);

    req.session.userId = null;
    req.session.userEmail = null;
    console.log(req.session);
    res.json({ succuss: true });
});

app.get("*", function (req, res) {
    if (!req.session.userEmail) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
