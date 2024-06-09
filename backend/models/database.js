import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config.js';
import bireyselModel from './Bireysel.js';
import kurumsalModel from './Kurumsal.js';
import TaskModel from './Task.js';
import ListModel from './List.js';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        logging: dbConfig.loggingLevel
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    });

const db = {
    Sequelize,
    sequelize,
    bireysel: bireyselModel(sequelize, DataTypes),
    kurumsal: kurumsalModel(sequelize, DataTypes),
    task: TaskModel(sequelize, DataTypes),
    list: ListModel(sequelize, DataTypes),
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize.sync({ force: true }).then(() => {
    console.log('Veritabanı başarıyla oluşturuldu.');
}).catch(err => {
    console.error('Veritabanını oluştururken bir hata oluştu:', err);
});

export default db;
