const mysql = require('mysql2');
const config = require('../../db.json');

class mysqlCLient {
    /**
     * 实例化连接池
     * @type mysql.Pool
     */
    #pool = null;

    constructor() {
        console.log('mysqlCLient constructor', i++);
        this.#pool = mysql.createPool({
            ...config,
        });
    }

    /**
     * 获取连接池
     * @type mysql.Pool
     */
    getPool() {
        return this.#pool;
    }

    /**
     * 获取poolPromise
     * @type mysql.Pool.promise
     */
    getPromisePool() {
        return this.#pool.promise();
    }
}

module.exports = new mysqlCLient();