const { exec } = require("../db/mysql.js");
// 查询博客列表接口
const getList = (author, keyword) => {
    let sql = `SELECT * FROM blogs WHERE 1=1 ` //1=1表示占位符，小技巧
    if (author) {
        sql += `AND \`author\`='${author}' `
    }
    if (keyword) {
        sql += `AND \`title\` LIKE '%${keyword}%' `
    }
    sql += `ORDER BY createtime DESC;`
    // 返回peomise
    return exec(sql)
}
// 获取博客详情接口
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}
// 新建博客内容接口
const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包含title、content、author属性等
    const title = blogData.title;
    const createTime = Date.now();
    const author = blogData.author;
    const content = blogData.content;
    const sql = `insert into blogs (title,content,createtime,author) values (
        '${title}','${content}',${createTime},'${author}'
    )`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}
// 更新博客内容接口
const updateBlog = (id, blogData = {}) => {
    const title = blogData.title;
    const createTime = Date.now();
    const author = blogData.author;
    const content = blogData.content;
    const sql = `update blogs set title='${title}', content='${content}',author='${author}',createTime=${createTime} where id=${id}`
    return exec(sql).then(updateData => {
        console.log(updateData);
        if (updateData.affectedRows > 0) {
            return true
        }
        return false;
    })
}
// 删除博客接口
const delBlog = (id, author) => {
    //id 删除博客的id
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}