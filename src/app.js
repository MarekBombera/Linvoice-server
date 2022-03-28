const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const appRouter = require('./routes/app.router');
const { pool } = require('./database/mysql');

const app = express();

app.use(helmet());

app.use(
	cors({
		origin: 'https://linvoice.org',
	})
);
app.use(express.json());

app.use(appRouter);

module.exports = app;
