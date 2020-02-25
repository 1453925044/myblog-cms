// const {
//     newBlog,
//     delBlog,
//     getList,
//     getDetail,
//     updateBlog,
// } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
    const method = req.method; //GET POST
    const url = req.url;
    const path = url.split(',')[0];

    //获取博客列表
    if (method == 'CET' && path === '/api/blog/list') {
        return {
            msg: '这是一个博客列表接口'
        }
    }

    //获取博客详情
    if (method === 'CET' && path === '/api/blog/detail') {
        return {
            msg: '这是博客详情的接口'
        }
    }
    //获取博客详情
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            msg: '这是博客新建的接口'
        }
    }
    //获取博客详情
    if (method === 'POST' && path === '/api/blog/updete') {
        return {
            msg: '这是博客更新的接口'
        }
    }
    //获取博客详情
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: '这是博客删除的接口'
        }
    }
}

module.exports = handleBlogRouter;