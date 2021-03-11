const spicedPg = require("spiced-pg");
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

module.exports.checkId= (email) => {
    const q = `SELECT * FROM users
    WHERE email = $1; `;

    const params = [email];

    return db.query(q, params);
};

module.exports.insertCode = (age, city, url, statement, user_id) => {
    const q = `INSERT INTO userpro (age, city, url, statement, user_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;`;

    const params = [age, city, url, statement, user_id];
    return db.query(q, params);
};