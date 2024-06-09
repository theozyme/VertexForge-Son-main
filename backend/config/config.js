import dotenv from 'dotenv';

dotenv.config();

export default {
  HOST: process.env.HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,

  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: parseInt(process.env.POOL_ACQUIRE),
    idle: parseInt(process.env.POOL_IDLE)
  },
  loggingLevel: process.env.LOGGING
};

/* Config.js açıklaması:
 Bu dosya hiç yazılmadan .env üzerinden gerekli tüm veriler, database.js üzerinden kullanılabilirdi.
 Fakat sequelize kütühanesi ayrı bir config dosyası üzerinden gidilmesini tavisye ediyor. Bu yüzden bu dosya oluşturuldu ve database.js içinde kullanıldı.
 */
