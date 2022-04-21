import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: 'busystem'   //bd antimon. id17438265_busystem
  }
});

export { conn };
