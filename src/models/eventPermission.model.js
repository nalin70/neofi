import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define('EventPermission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.ENUM('Owner', 'Editor', 'Viewer'), allowNull: false },
  });