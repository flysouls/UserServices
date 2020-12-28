const Router = require('koa-router');
const UserService = require('../services/user');

const router = new Router({
  prefix: '/api/user'
})

/**
 * 查询所有用户
 */
router.get('/query', async (ctx, next) => {
  ctx.body = await new UserService(ctx).queryUsers();
})

/**
 * 查询指定用户
 */
router.get('/query/:id', (ctx, next) => {
  // 
})

// 新增用户
router.get('/add', async (ctx, next) => {
  const params = ctx.query;
  params.realName = encodeURIComponent(params.realName);
  params.nickName = encodeURIComponent(params.nickName);
  const res = await new UserService(ctx).addUser(params)
  ctx.body = res;
})

// 删除用户
router.get('/delete/:id', (ctx, next) => {
  // 
})

//创建表
router.get('/init', async (ctx, next) => {
  ctx.body = await new UserService().init();
})

// router.use()


module.exports = router.routes();