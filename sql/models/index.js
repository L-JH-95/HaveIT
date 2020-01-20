  
const path = require('path');               
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Habit = require('./habit')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);
db.Client = require('./client')(sequelize, Sequelize);


db.User.hasMany(db.Comment, { foreignKey: 'UID', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'UID', targetKey: 'id' });

db.Habit.hasMany(db.Notification, { foreignKey: 'HID', sourceKey: 'id' });
db.Notification.belongsTo(db.Habit, { foreignKey: 'HID', targetKey: 'id' });

db.User.hasMany(db.Habit, { foreignKey: 'UID', sourceKey: 'id' });
db.Habit.belongsTo(db.User, { foreignKey: 'UID', targetKey: 'id' });

db.Client.hasMany(db.Notification, { foreignKey: 'CID', sourceKey: 'id' });
db.Notification.belongsTo(db.Client, { foreignKey: 'CID', targetKey: 'id' });


module.exports = db;