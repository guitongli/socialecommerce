const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // const { db_user, db_secret } = require("./secrets.json");
    db = spicedPg(`postgres:postgres:postgres@localhost:5432/socialnetwork`);
}

module.exports.insertUser = (username, yourname, email, hashkeys) => {
    const q = `INSERT INTO users (username, yourname, email, hashkeys, bio, pic)
    VALUES($1, $2, $3, $4, null, null)
    RETURNING *;`;

    const params = [username, yourname, email, hashkeys];

    return db.query(q, params);
};

module.exports.checkEmail = (email) => {
    const q = `SELECT COUNT(1)
FROM users
WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getEmail = (email) => {
    const q = `SELECT *
FROM users
WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};
module.exports.getId = (id) => {
    const q = `SELECT *
FROM users
WHERE id = $1;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getCode = (email) => {
    const q = `SELECT *
FROM codes
WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.checkUser = (email) => {
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

module.exports.updatePassword = (email, hashkeys) => {
    const q = `UPDATE users
    SET hashkeys = $2
    WHERE email = $1;`;
    const params = [email, hashkeys];
    return db.query(q, params);
};

module.exports.insertImg = (url, username) => {
    const q = `
    UPDATE users 
    SET pic = $1
    WHERE username = $2
   RETURNING *;`;
    const params = [url, username];
    return db.query(q, params);
};
module.exports.insertBio = (bio, username) => {
    const q = `
    UPDATE users 
    SET bio = $1
    WHERE username = $2
   RETURNING *;`;
    const params = [bio, username];
    return db.query(q, params);
};

module.exports.getRecent = () => {
    const q = `SELECT * FROM users ORDER BY created_at DESC LIMIT 10;`;
    // const q =`SELECT TOP 10 * FROM Table ORDER BY ID DESC;`;
    return db.query(q);
};
module.exports.search = (input) => {
    const q = `SELECT * FROM users WHERE LOWER(yourname) ILIKE LOWER('%' || $1 ||'%') LIMIT 20;`;
    const params = [input];
    return db.query(q, params);
};

module.exports.checkFriendship = (yourId, hisId) => {
    const q = `SELECT * FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [yourId, hisId];
    return db.query(q, params);
};

module.exports.makeFriendship = (yourId, hisId) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
    VALUES($1, $2)
    RETURNING *;`;
    const params = [yourId, hisId];
    return db.query(q, params);
};
module.exports.breakFriendship = (yourId, hisId) => {
    const q = `DELETE FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) 
    OR (recipient_id = $2 AND sender_id = $1)
    RETURNING *;`;
    const params = [yourId, hisId];
    return db.query(q, params);
};

module.exports.acceptFriendship = (yourId, hisId) => {
    const q = `UPDATE friendships 
    SET accepted = true
    WHERE (recipient_id = $1 AND sender_id = $2)
    RETURNING *;`;
    const params = [yourId, hisId];
    return db.query(q, params);
};

module.exports.getRelations = (yourId) => {
    const q = `SELECT users.id, users.username, users.yourname, users.pic, friendships.accepted, friendships.recipient_id, friendships.sender_id
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
     OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND sender_id = users.id);`;
    const params = [yourId];
    return db.query(q, params);
};

module.exports.insertItem = (
    seller_id,
    item_name,
    item_des,
    item_pic,
    item_price
) => {
    const q = `INSERT INTO sales (seller_id, item_name, item_des, item_pic, item_price)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;`;
    const params = [seller_id, item_name, item_des, item_pic, item_price];
    return db.query(q, params);
};

module.exports.getMyItems = (yourId) => {
    const q = `SELECT * FROM sales
    WHERE seller_id = $1 ;`;
    const params = [yourId];
    return db.query(q, params);
};
module.exports.getHisItems = (hisId) => {
    const q = `SELECT * FROM sales
    WHERE seller_id = $1 ;`;
    const params = [hisId];
    return db.query(q, params);
};

module.exports.countLikes = (item_id) => {
    const q = `SELECT COUNT(liker_id)
FROM likes
WHERE item_id = $1;`;
    const params = [item_id];
    return db.query(q, params);
};
module.exports.getItem = (id) => {
    const q = `SELECT * FROM sales
    WHERE id = $1 ;`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getMessages = () => {
    const q = `SELECT * FROM messages 
    JOIN users
    ON (user_id=users.id)
    LIMIT 10;`;
    // const q =`SELECT TOP 10 * FROM Table ORDER BY ID DESC;`;
    return db.query(q);
};

module.exports.insertItem = (user_id, content) => {
    const q = `INSERT INTO messages (user_id, content)
    VALUES($1, $2)
    RETURNING *;`;
    const params = [user_id, content];
    return db.query(q, params);
};
    