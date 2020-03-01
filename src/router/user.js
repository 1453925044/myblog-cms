const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleUserRouer = (req, res) => {
    const path = req.path; //获取当前路由
    const method = req.method//GET POST
    ///登录
    if (method === 'GET' && path === '/api/user/login') {
        // const { name, password } = req.body;//POST
        const { name, password } = req.query;//GET
        const result = login(name, password);
        return result.then(data => {
            if (data.name) {
                // 设置session
                req.session.name = data.name;
                req.session.password = data.password;
                console.log(req.session)
                return new SuccessModel('登录成功')
            }
            return new ErrorModel('登录失败')
        })
    }
    // 验证登录
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.session.name) {
            return Promise.resolve(new SuccessModel({
                message: '登录验证成功',
                session: req.session.name
            }))
        }
        return Promise.resolve(new ErrorModel('登录验证失败'))
    }

}
module.exports = handleUserRouer;