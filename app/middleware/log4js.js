const log4js = require('log4js');
const path = require('path');

/**
 * 获取日志配置
 * @param {string} name 
 */
const getLogger = name => {
  let appenders = {
    access: {
      type: 'dateFile',
      filename: path.join('./logs/', 'access.log'),
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join('./logs/', 'application.log'),
      alwaysIncludePattern: true
    },
    out: {
      type: 'console'
    }
  }
  const env = process.env.NODE_ENV;
  if (env === "dev" || env === "development") {
    appenders.out = {
      type: "stdout"
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: 'all',
      },
      access: { appenders: [ 'access' ], level: 'info' },
      application: { appenders: [ 'application' ], level: 'WARN'}
    }
  }
  log4js.configure(config) //使用配置项
  return log4js.getLogger(name)// 这个cheese参数值先会在categories中找，找不到就会默认使用default对应的appenders,信息会输出到yyyyMMdd-out.log
}

// 记录所有级别的访问
const Logger = options => {
  const logger = getLogger('cheese');
  return async (ctx, next) => {
    const start = Date.now();
    // 将log能力挂在ctx上
    ctx.log = logger;
    await next();
    const endTime = new Date().getTime();
    const ms = endTime - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    ctx.log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  }
}

module.exports = Logger;