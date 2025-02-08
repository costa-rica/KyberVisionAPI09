// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Player = sequelize.define(
  "Player",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Birth_Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }
);

module.exports = Player;