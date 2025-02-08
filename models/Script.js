// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const Script = sequelize.define(
  "Script",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Match_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Last_Access_Date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }
);

module.exports = Script;