// 连接池实例
const mysqlClient = require('../database');

class User {
  constructor() { }

  // 新增用户

  // 删除用户

  // 修改用户信息
  
  // 查询用户

  // 查询所有用户
  async getAllUser() {
    let [res, field] = await mysqlClient.getPromisePool().query("select * from Persons");
    return res
  }

}