import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING },
    isRecurring: { type: DataTypes.BOOLEAN, defaultValue: false },
    recurrencePattern: { type: DataTypes.STRING },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });