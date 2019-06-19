(async () => {
    const Sequelize = require('sequelize');
    //建立连接（数据库、用户名、密码，连接用的配置）
    const sequelize = new Sequelize('kaikeba', 'root', 'QXFY105729', {
        host: 'localhost',
        dialect: 'mysql',//中间件支持很多数据库，所以标明你连接的是哪个
        operatorsAliasez: false//操作符别名
    });

    //定义模型
    const Fruit = sequelize.define('TblFruit', {
        //因为id是自增的，数据容易被盗，所以使用UUID处理id
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: {type: Sequelize.STRING(20), allowNull: false},
        price: {type: Sequelize.FLOAT, allowNull: false},
        stock: {type: Sequelize.INTEGER, defaultValue: 0},
    }, {timestamps: false, underscored: true});
    //timestamps:false避免自动生成时间戳字段
    //指定表名:设置前者则以modelName作为表名；设置后者则按其值作为表名
    //蛇形命名：underscored:true
    //默认驼峰命名

    //同步数据库
    let ret = await Fruit.sync({force: true});//{force:true}强制同步，创建表之前先删除已存在的表
    console.log('sync', ret);

    //添加数据
    ret = await Fruit.create({
        name: '香蕉',
        price: 3.5
    });
    ret = await Fruit.create({
        name: '苹果',
        price: 8.5
    });
    console.log('create', ret);

    //修改数据
    await Fruit.update(
        {price: 4},
        {where: {name: '香蕉'}}
    );

    //查询
    const Op = Sequelize.Op;
    ret = await Fruit.findAll({
        where: {price: {[Op.lt]: 5, [Op.gt]: 2}}
    });

    console.log('findAll', JSON.stringify(ret, '', '\t'));


})();