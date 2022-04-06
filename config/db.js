import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: 'yGuIqsAlxNT',
    port: 3306,
    database: 'busystem'
  }
});

export { conn };
