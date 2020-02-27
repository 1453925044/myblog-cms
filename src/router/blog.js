const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET POST
    //获取博客列表
    if (method == 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData)
        })

    }
    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || '';
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    //新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = '魏大大'//假数据,待开发登录时加上
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    //更新博客内容
    if (method === 'POST' && req.path === '/api/blog/update') {
        req.body.author = '魏大大2'//假数据,待开发登录时加上
        const result = updateBlog(req.query.id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel('博客更新成功')
            } else {
                return new ErrorModel('博客更新失败')
            }
        })

    }
    //删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const author = '魏大大2'//假数据,待开发登录时加上
        const result = delBlog(req.query.id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel('博客删除成功')
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}

module.exports = handleBlogRouter;