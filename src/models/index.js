import { Sequelize } from 'sequelize';
import config from '../config.js';
import UserModel from './user.model.js';
import EventModel from './event.model.js';
import EventPermissionModel from './eventPermission.model.js';
import EventVersionModel from './eventVersion.model.js';

// const sequelize = new Sequelize(
//   config.db.name,
//   config.db.user,
//   config.db.password,
//   {
//     host: config.db.host,
//     dialect: 'postgres',
//     port: config.db.port,
//     logging: false,
//   }
// );

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
      host: config.db.host,
      dialect: 'mysql', // <-- changed from 'postgres' to 'mysql'
      port: config.db.port,
      logging: false,
    }
  );

const User = UserModel(sequelize);
const Event = EventModel(sequelize);
const EventPermission = EventPermissionModel(sequelize);
const EventVersion = EventVersionModel(sequelize);

// Associations
User.hasMany(Event, { foreignKey: 'ownerId' });
Event.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

Event.hasMany(EventPermission, { foreignKey: 'eventId' });
EventPermission.belongsTo(Event, { foreignKey: 'eventId' });
User.hasMany(EventPermission, { foreignKey: 'userId' });
EventPermission.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(EventVersion, { foreignKey: 'eventId' });
EventVersion.belongsTo(Event, { foreignKey: 'eventId' });

export { sequelize, User, Event, EventPermission, EventVersion };