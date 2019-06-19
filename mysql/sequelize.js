(async ()=>{
    const Sequelize=require('sequelize');
    //建立连接
    const sequelize=new Sequelize('kaikeba','root','example',{
        host:'localhost',
        dialect:'mysql',
        operatorsAliasez:false
    });

    //定义模型
    const Fruit=sequelize.define('Fruit',{
        name:{type:Sequelize.STRING(20),allowNull:false},
        price:{type:Sequelize.FLOAT,allowNull: false},
        stock:{type:Sequelize.INTEGER,defaultValue:0}
    });

    //同步数据库
    let ret=await Fruit.sync();
    console.log('sync', ret);

    //添加数据
    ret=await Fruit.create({
        name:'香蕉',
        price:3.5
    });

    console.log('create', ret);
})();