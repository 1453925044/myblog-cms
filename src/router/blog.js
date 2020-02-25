const { getList, getDetail } = require('../controller/blog')
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
        return {
            msg: '这是博客新建的接口'
        }
    }
    //获取博客详情
    if (method === 'POST' && req.path === '/api/blog/updete') {
        return {
            msg: '这是博客更新的接口'
        }
    }
    //获取博客详情
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: '这是博客删除的接口'
        }
    }
}

module.exports = handleBlogRouter;