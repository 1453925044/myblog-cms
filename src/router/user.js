const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('时间:' + d.toGMTString())
    return d.toGMTString() //cookie时间格式
}

const handleUserRouer = (req, res) => {
    const method = req.method//GET POST
    const path = req.path;
    ///登录
    if (method === 'GET' && path === '/api/user/login') {
        // const { name, password } = req.body;//POST
        const { name, password } = req.query;//GET
        const result = login(name, password)
        return result.then(data => {
            if (data.name) {
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.name}; path=/; httpOnly; exprise=${getCookieExpires()}`)
                return new SuccessModel('登录成功')
            }
            return new ErrorModel('登录失败')
        })
    }
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                message: '登录验证成功',
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('登录验证失败'))
    }

}
module.exports = handleUserRouer;