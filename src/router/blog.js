const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET POST
    //获取博客列表
    if (method == 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword);
        return new SuccessModel(listData)
    }
    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || '';
        const data = getDetail(id);
        return new SuccessModel(data);
    }
    //新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    //更新博客内容
    if (method === 'POST' && req.path === '/api/blog/updete') {
        const result = updateBlog(req.query.id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('博客更新失败')
        }
    }
    //删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(req.query.id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除失败')
        }
    }
}

module.exports = handleBlogRouter;