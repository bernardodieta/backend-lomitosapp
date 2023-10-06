const mysql = require('mysql2');

const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION:LOST'){
            console.error('DATABASE CONNECTION WAL CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATA BASE HAS TO MANY CONNECTION');
        }
        if (err.code === 'ENCONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is Connected.');
    return;
});
//Promesas de pool querys.
pool.query = promisify(pool.query)

module.exports = pool;
