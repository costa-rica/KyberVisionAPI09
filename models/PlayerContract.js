// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const PlayerContract = sequelize.define(
  "PlayerContract",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Player_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Team_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Shift_Number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

module.exports = PlayerContract;