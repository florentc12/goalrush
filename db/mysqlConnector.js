const mysql = require('mysql');

const pool = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'goalrush'
});

var dbConnection = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            resolve(connection);
        });
    });
};

module.exports = dbConnection;