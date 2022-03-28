require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
	host: process.env.HOST,
	port: process.env.PORT,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

const promisePool = pool.promise();

const escape = (value) => {
	const result = promisePool.escape(value);
	return result;
};

module.exports = { pool, promisePool: promisePool, escape };
