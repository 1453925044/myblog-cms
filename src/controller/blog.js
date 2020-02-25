const exec = require("../db/mysql");
// 对博客列表接口
const getList = (author, keyword) => {
    // let sql = `select * from blogs where 1=1 `
    // if (author) {
    //     sql += `and author=${author}`
    // }
    // if (keyword) {
    //     sql += `and title like '%${keyword}%'`
    // }
    // sql += `order by createtime desc;`
    // // 返回peomise
    // return exec(sql)
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createtime: 1582611267584,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createtime: 1582611315841,
            author: '李四'
        }
    ]
}
// 获取博客详情接口
const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createtime: 1582611267584,
        author: '李四'
    }
}
// 新建博客内容接口
const newBlog = (blogData = {}) => {
    //blogData 是一个博客对象，包含title、content、属性等
    return {
        id: 3//表示新建博客、插入到数据表里面的id
    }

}
// 更新博客内容接口
const updateBlog = (id, blogData = {}) => {
    console.log(id)
    console.log(blogData)
    return true
}
// 删除博客接口
const delBlog = (id) => {
    console.log(id)
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}