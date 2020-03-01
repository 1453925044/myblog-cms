const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
// 监听redis事件
redisClient.on('error', err => {
    console.error(err)
})
 
// 设置redis key值 
const set = (key, val) => {
    //key,val必须是个字符串
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

// 获取redis key value值
const get = (key) => {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            // 异常处理
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            // 兼容key,val传过来的数据类型,并非抛出异常
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
        return promise;
    })
    return promise;
}

module.exports = {
    set,
    get
}


