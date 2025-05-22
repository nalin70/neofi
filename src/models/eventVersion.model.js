import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('EventVersion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    versionNumber: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: false }, // <-- Change JSONB to JSON
    changedBy: { type: DataTypes.INTEGER, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    changeSummary: { type: DataTypes.TEXT },
  });