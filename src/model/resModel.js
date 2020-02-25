// 创建基本请求数据模型
class BaseModel {
    constructor(data, message) {
        //如果data不是对象,message是字符串,第二个参数没传
        if (data == 'string') {
            this.message = data;
            data = null;
            message = null
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}
// 创建请求成功的数据模型
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

// 创建请求失败的数据模型
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}


module.exports = {
    SuccessModel,
    ErrorModel
};