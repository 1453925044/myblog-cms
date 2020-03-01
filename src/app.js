const querysring = require('querystring')
const { gte, set } = require('./db/redis');
const handleBlogRouter = require('../src/router/blog')
const handleUserRouer = require('../src/router/user')

// //section数据
// const SESSION_DATA = {};

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString() //cookie时间格式
}

const serverHandle = (req, res) => {
    //设置返回格式 json
    res.setHeader('Content-type', 'application/json');
    const url = req.url;
    req.path = url.split('?')[0];
    // 解析query
    req.query = querysring.parse(url.split('?')[1]);
    //解析cookie
    req.cookie = {}; //创建一个空的cookie对象用于存储成json格式
    const cookieStr = req.headers.cookie || ''; //k1=v1;k2=v2，字符串格式
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim(); //trim去掉添加的cookie空格
        const val = arr[1].trim();
        req.cookie[key] = val;
    });
    console.log('cookie' + JSON.stringify(req.cookie));

    // 解析session
    // let needSetCookie = false;
    // let userId = req.cookie.userid;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {};
    //     }
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];

    //解析session (使用redis)
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        //初始化redis中的session值
        set(userId, {})
    }
    //获取session
    req.sessionId = userId;
    get(userId).then(sessionData => {
        if (sessionData == null) {
            // 初始化session
            set(req.sessionId, {})
            //设置session
            req.session = {}
        } else {
            //设置session
            req.session = sessionData;
        }
    })

    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData;
        // 处理博客路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; exprise=${getCookieExpires()}`)
                }
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
                if (needSetCookie) {
                    console.log('设置cookie')
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; exprise=${getCookieExpires()}`)
                    console.log('设置成功')
                }
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
