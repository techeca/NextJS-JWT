import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: 'localhost',
    user: 'id17438265_admin',
    password: '2&%J~hjKpwLdpMue',
    port: 3306,
    database: 'id17438265_userdb'
  }
});

export { conn };
