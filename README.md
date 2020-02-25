# myblog-cms
基于nodejs搭建的后台博客服务(第一阶段:原生node搭建)


# list
|-myblog-cms
  |-bin
  |  |-www.js       //服务配置文件
  |-nodemon.json    //检测自动刷新服务的文件配置
  |-package-lock.json
  |-package.json    //安装包依赖
  |-src             //资源管理文件夹
  |  |-app.js
  |  |-config       //数据库配置文件
  |  |  |-db.js
  |  |-controller   //逻辑控制层
  |  |  |-blog.js
  |  |  |-user.js
  |  |-db           //数据库连接配置
  |  |  |-mysql.js
  |  |-Model        //监听事件处理层
  |  |  |-resModel.js
  |  |-router       //路由层
  |  |  |-blog.js
  |  |  |-user.js
  |-static          //静态资源文件
  |  |-index.html
