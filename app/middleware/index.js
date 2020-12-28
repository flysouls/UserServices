const logger = require('./log4js');
const notFound = require('./notFound');

module.exports = [
  logger, // 日志中间件需要放在第一个
  notFound, // 判断404和5xx错误
]