const { loginCheck } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const handleUserRouer = (req, res) => {
    const method = req.method//GET POST
    const url = req.url;
    const path = req.path;
    ///登录
    if (method === 'POST' && path === '/api/user/login') {
        const { name, password } = req.body;
        const result = loginCheck(name, password)
        return result.then(data => {
            if (data.name) {
                return new SuccessModel('登录成功')
            }
            return new ErrorModel('登录失败')
        })
    }
}
module.exports = handleUserRouer;