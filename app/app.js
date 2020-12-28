const Koa = require('koa');
const middleWares = require('./middleware');
const routers = require('./router');

const app = new Koa({
  proxy: true,
  maxIpsCount: 1, // 服务器前只有一个代理
});

// 加载中间件
middleWares.forEach(item => {
  app.use(item());
})

// 加载路由
routers.forEach(item => {
  app.use(item);
})

app.listen(3000);
