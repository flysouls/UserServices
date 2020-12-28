// get the client
const config = require('../../db.config.js');
const { Sequelize } = require('sequelize');

class DataBaseService {
  /**
   * sequelize实例
   * @type {Sequelize}
   */
  constructor() {
    if (!this.sequelize) {
      this.sequelize = new Sequelize({
        host: config.host,
        username: config.user,
        password: config.password,
        database: config.database,
        dialect: 'mysql',
        pool: {
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        },
        logging: console.log,
        define: {
          charset: 'utf8',
          dialectOptions: {
            collate: 'utf8_general_ci'
          }
        }
      })
    }
  }

  isSequelizeComplate() {
    let complate = false;
    try {
      async () => await sequelize.authenticate();
      complate = true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    return complate;
  }

  close() {
    this.sequelize.close();
  }

  getSequelize() {
    return this.sequelize;
  }

  query() {
    return this.sequelize.pool;
  }
}

module.exports = DataBaseService;