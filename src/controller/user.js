const { exec } = require('../db/mysql')
const loginCheck = (username, password) => {
    const sql = `select * from user where name='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        return rows[0] || {};
    })
}
module.exports = {
    loginCheck
};