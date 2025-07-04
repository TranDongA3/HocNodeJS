const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});

const connectDB=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports={
    connectDB
}

