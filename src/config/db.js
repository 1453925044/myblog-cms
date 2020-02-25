const env = process.env.NODE_ENV; //环境配置
// 定义数据库配置变量
let MYSQL_CONF;
if (env == 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '961010',
        port: '3306',
        database: 'my_blog'
    }

}
if (env == 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '961010',
        port: '3306',
        database: 'my_blog'
    }
}

module.exports = {
    MYSQL_CONF
}



