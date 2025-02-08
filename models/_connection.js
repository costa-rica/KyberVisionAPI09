const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  // storage: path.join(__dirname, "../database.sqlite"), // Database file location
  storage: path.join(process.env.PATH_DATABASE, "kv07.db"), // Database file location
  logging: false, // Disable logging
});

console.log(`database location: ${path.join(process.env.PATH_DATABASE, "kv07.db")}`)

module.exports = sequelize;