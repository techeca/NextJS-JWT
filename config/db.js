import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: '192.168.0.8',
    user: 'root',
    password: 'yGuIqsAlxNT',
    port: 3306,
    database: 'busystem'
  }
});

export { conn };
