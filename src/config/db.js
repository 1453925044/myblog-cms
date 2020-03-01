const env = process.env.NODE_ENV; //环境配置
// 定义mysql数据库配置变量
let MYSQL_CONF;
// 定义redis配置变量
let REDIS_CONF;
// 开发环境配置
if (env == 'dev') {
    //mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '961010',
        port: '3306',
        database: 'my_blog'
    }

    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    }

}
// 生产环境配置
if (env == 'production') {
    //mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '961010',
        port: '3306',
        database: 'my_blog'
    }
    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1',
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}



