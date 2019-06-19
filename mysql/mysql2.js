(async () => {
    const mysql = require('mysql2/promise')

    // 连接配置
    const cfg = {
        host: "localhost",
        user: "root",
        password: "QXFY105729", // 修改为你的密码
        database: "kaikeba" // 请确保数据库存在（需要在mysql中创建kaikeba数据库）
    };

    const connection = await mysql.createConnection(cfg)
    //建表
    let ret = await connection.execute(`
        CREATE TABLE IF NOT EXISTS test (
            id INT NOT NULL AUTO_INCREMENT,
            message VARCHAR(45) NULL,
        PRIMARY KEY (id))
    `);
    console.log('create', ret);
    //插入一条数据
    ret = await connection.execute(`
            INSERT INTO test(message)
            VALUES(?)
    `, ['ABC']);
    console.log('insert:', ret);

    //查询创建的数据
    ret = await connection.execute(`
            SELECT * FROM test
    `);
    console.log(JSON.stringify(ret[0]));
    // console.log(ret[1])

    connection.end();

})();