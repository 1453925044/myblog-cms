const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);
// 开始连接
con.connect();

// 统一执行sql函数
function exec(sql) {
    const promise = new promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            console.log(res)
            resolve(res)
        })
    })
    return promise;
}

module.exports = {
    exec
}