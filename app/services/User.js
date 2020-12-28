const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../db');

const User = new sequelize().getSequelize().define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  nickName: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  realName: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  createTime: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
    allowNull: false,
  }
})

// userService
class UserService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * 创建表
   */
  async init() {
    const res = await User.sync({ force: true });
    return res;
  }

  /**
   * 查询所有用户
   */
  async queryUsers() {
    const users = await User.findAll();
    console.log(users);
    this.ctx.log.info(JSON.stringify(users, null, 2));
    return users;
  }

  /**
   * 新增用户
   * @param {any} user 
   */
  async addUser(user) {
    const par = { ...user, uid: uuidv4() };
    const jane = await User.create(par);
    return jane;
  }
}

module.exports = UserService;