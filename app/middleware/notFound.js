/**
 * 404中间件
 * @param {} option 
 */

const notFound = option => {
  return async (ctx, next) => {
    try {
      await next();
      if (!ctx.body) {
        ctx.res.statusCode = 404;
        ctx.body = 'not Found';
      }
    } catch (err) {
      ctx.log.error(err);
      ctx.res.statusCode = 500;
      ctx.body = '哎呀，恭喜你发现一个预料之外的错误，程序猿正在修复中～';
    }
  }
}

module.exports = notFound;