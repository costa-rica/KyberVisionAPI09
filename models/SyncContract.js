// NR: refactored 2025-02-08
const { DataTypes } = require("sequelize");
const sequelize = require("./_connection");

const SyncContract = sequelize.define(
  "SyncContract",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Script_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Video_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Delta_Time: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "SyncContracts",
    timestamps: false,
  }
);

module.exports = SyncContract;