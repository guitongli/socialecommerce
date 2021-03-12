const spicedPg = require('spiced-pg');
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // const { db_user, db_secret } = require("./secrets.json");
    db = spicedPg(`postgres:postgres:postgres@localhost:5432/socialnetwork`);
}

module.exports.insertUser = (firstname, lastname, email, hashkeys) => {
    const q = `INSERT INTO users (firstname, lastname, email, hashkeys)
    VALUES($1, $2, $3, $4)
    RETURNING *;`;

    const params = [firstname, lastname, email, hashkeys];

    return db.query(q, params);
};

module.exports.checkEmail = (email) => {
    const q = `SELECT COUNT(1)
FROM users
WHERE email = $1;`;
    const params = [email];
    return db.query(q,params);
};

module.exports.getName = (email) => {
    const q = `SELECT *
FROM users
WHERE email = $1;`;
    const params = [email];
    return db.query(q,params);
};

module.exports.getCode = (email) => {
    const q = `SELECT *
FROM codes
WHERE email = $1;`;
    const params = [email];
    return db.query(q,params);
};

module.exports.checkUser = email => {
    const q = `SELECT * FROM users
    WHERE email = $1; `;

    const params = [email];

    return db.query(q, params);
};

module.exports.insertCode = (email, code) => {
    const q = `
    INSERT INTO codes (email, code)
VALUES($1, $2)
ON CONFLICT (email) 
DO 
   UPDATE SET code = $2;`;

    const params = [email, code];
    return db.query(q, params);
};

module.exports.updatePassword = (
    email, hashkeys
) => {
    const q = `UPDATE users
    SET hashkeys = $2
    WHERE email = $1;`;
    const params = [email, hashkeys];
    return db.query(q, params);
};
