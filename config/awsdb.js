import mysql from 'serverless-mysql';

//create mysql connection
const conn = mysql({
  config: {
    host: 'dbbusystem.cxe3fbl4arzw.sa-east-1.rds.amazonaws.com',
    user: 'admindb',
    password: 'dbadmin*',
    port: 3306,
    database: 'busystem'                                                
  }
});

export { conn };
