const { promisePool, escape } = require('./mysql');
const { clientApiSchema } = require('../models/clientApiSchema');

const getAllUserInvoices = async (propsUserId) => {
	const getAllDataInvoiceQuery = `
		SELECT * FROM invoices 
		WHERE user_id = ${escape(propsUserId)};`;

	const [queriedInvoices] = await promisePool.query(getAllDataInvoiceQuery);

	const getAllInvoicesDataFormattedForApi = queriedInvoices.map(
		async (invoice) => {
			const getItemListQuery = `
				SELECT itemName, quantity, price FROM itemList
				WHERE invoice_id = ${escape(invoice.invoice_id)};`;

			const [results] = await promisePool.query(getItemListQuery);
			return clientApiSchema(invoice, results);
		}
	);

	const promiseAllResult = Promise.all(getAllInvoicesDataFormattedForApi);
	return promiseAllResult;
};

module.exports = {
	getAllUserInvoices,
};
