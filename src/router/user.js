const { loginCheck } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const handleUserRouer = (req, res) => {
    const method = req.method//GET POST
    const url = req.url;
    const path = req.path;
    ///登录
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body;
        const result = loginCheck(username, password)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登录失败')
        }
    }
}
module.exports = handleUserRouer;