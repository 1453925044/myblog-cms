const querysring = require('querystring')
const handleBlogRouter = require('../src/router/blog')
const handleUserRouer = require('../src/router/user')

// 创建post情况处理
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return;
        }
        if (req.headers['Content-type'] !== 'application/json') {
            resolve({})
            return;
        }
        let postData;
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

const serverHandle = (req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json');
    const url = req.url;
    req.path = url.split('?')[0]
    // 解析query
    req.query = querysring.parse(url.split('?')[0]);
    getPostData(req).then(postData => {
        req.body = postData;
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
        res.writeHead(404, { 'Content-type': 'text/plain;charset=utf-8' })
        res.write('草泥马');
        res.end();
    })
}
module.exports = serverHandle;
