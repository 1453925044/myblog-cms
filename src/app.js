const querysring = require('querystring')
const handleBlogRouter = require('../src/router/blog')
const handleUserRouer = require('../src/router/user')

const serverHandle = (req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json');
    const url = req.url;
    req.path = url.split('?')[0]
    // 解析query
    req.query = querysring.parse(url.split('?')[1]);

    getPostData(req).then(postData => {
        req.body = postData;
        // 处理博客路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        //处理登陆路由
        const useResult = handleUserRouer(req, res);
        if (useResult) {
            useResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // 未命中路由
        res.writeHead(404, { 'Content-type': 'text/html;charset=utf-8' })
        res.write(`<h1 style="margin:auto">404 NOT FIND</h1>`)
        res.end();
    })
}
// 创建post情况处理
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })

    })
    return promise;
}
module.exports = serverHandle;
