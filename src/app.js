const handleBlogRouter = require('../src/router/blog')
const handleUserRouer = require('../src/router/user')
const serverHandle = (req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json');
    // 处理博客路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    //处理登陆路由
    const userData = handleUserRouer(req, res);
    if (userData) {
        res.json(
            JSON.stringify(userData)
        )
        return
    }

    // 未命中路由
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 NOT FUND');
    res.end();

}
module.exports = serverHandle;
