var mysql = require("mysql");
require('dotenv').config();

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


const executeQuery = async (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

const executeQueryWithParam = async (query, param, trans = 0, connection = "") => {
    return new Promise((resolve, reject) => {
        if (trans == 0) {
            pool.query(query, param, (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            })
        }
        else if (trans == 1) {
            connection.query(query, param, (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            })
        }
    })
}

const getConnection = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) reject(err);
            else resolve(conn);
        })
    })
}

const trans = async (objectHeader, objectDetail) => {
    const connection = await getConnection();

    try {
        await connection.beginTransaction();
        if (objectHeader != undefined && objectHeader != null) {
            await executeQueryWithParam(objectHeader.qry, objectHeader.params, 1, connection)
        }
        for (let index = 0; index < objectDetail.length; index++) {
            console.log(objectDetail[index].qry);
            await executeQueryWithParam(objectDetail[index].qry, objectDetail[index].params, 1, connection)
        }
        await connection.commit();
    } catch (e) {
        await connection.rollback();
        throw e;
    } finally {
        await connection.release();
    }

}


module.exports = {
    'executeQuery': executeQuery,
    'executeQueryWithParam': executeQueryWithParam,
    'getConnection': getConnection,
    'trans': trans
};