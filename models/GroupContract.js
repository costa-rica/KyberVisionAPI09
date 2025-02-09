//NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const GroupContract = sequelize.define(
  "GroupContract",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    User_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Team_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Rights_flags: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  }
);

module.exports = GroupContract;