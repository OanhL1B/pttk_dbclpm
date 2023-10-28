const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("vi_db", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  password: "123456",
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDatabase;
