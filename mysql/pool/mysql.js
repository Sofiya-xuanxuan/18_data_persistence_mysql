// mysql2.js
(async () => {
    // get the client
    const mysql = require('mysql2/promise');
    // 连接配置
    const cfg = {
        host: "localhost",
        user: "root",
        password: "QXFY05729", // 修改为你的密码
        database: "shop", // 请确保数据库存在
        connectionLimit: 5,//不设置的情况下，默认是10
    };

    // 设置连接池
    const pool = await mysql.createPool(cfg);

    // 非连接池
    // const query = async () => {
    //     const connection = await mysql.createConnection(cfg);
    //     const [rows, fields] = await connection.execute(`SELECT * FROM users`);
    //     console.log('select:', rows);
    //     connection.destroy();//需要将连接清除掉，不然会越来越多的
    // };

    // 连接池
    const query = async () => {
        const connection = await pool.getConnection()
        const [rows, fields] = await connection.execute(`SELECT * FROM users`)
        console.log('select:', rows)
        connection.release()
    }

    const {asyncFun} = require('./async');
    await asyncFun(query, 4, 10);

})();

