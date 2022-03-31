import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: localhost,       
    user: 'admin',
    password: '2&%J~hjKpwLdpMue',
    port: 3306,
    database: 'userdb'
  }
});

export { conn };
