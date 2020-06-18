const db = require("../database/db");
const userDB = require("./user");
const { forEach } = require("mysql2/lib/constants/charset_encodings");
const dbConn = db.getConnection();

const create_review = async(uid, tid, content, rating) => {
    const sql = "insert into reviews (travel_id, content, rating, user_id) values (?, ?, ?, ?);";
    [results, fields] = await dbConn.query(sql, [tid, content, rating, uid]);
    return results.insertId;
}

const get_review = async(tid) => {
    const sql = "select reviews.travel_id, reviews.content, reviews.rating, users.username, reviews.created_at from reviews inner join users on reviews.user_id = users.userid where reviews.user_id = ?;";
    const [results, fields] = await dbConn.query(sql, [tid]);
    return results;
}

module.exports = {
    create_review: create_review,
    get_review: get_review
}