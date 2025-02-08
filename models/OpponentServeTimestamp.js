// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const OpponentServeTimestamp = sequelize.define(
  "OpponentServeTimestamp",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Action_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Timestamp_ServiceOpp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Serve_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

module.exports = OpponentServeTimestamp;