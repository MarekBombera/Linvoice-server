const { promisePool, escape } = require('./mysql');

const deleteInvoice = async (invoiceId, userId) => {
	const deleteFromItemListQuery = `
	DELETE FROM itemList
   WHERE invoice_id = ${escape(invoiceId)}
	AND user_id = ${escape(userId)};`;

	const deleteFromInvoicesQuery = `
	DELETE FROM invoices
   WHERE invoice_id = ${escape(invoiceId)}
	AND user_id = ${escape(userId)};`;

	await promisePool.execute(deleteFromItemListQuery);
	await promisePool.execute(deleteFromInvoicesQuery);
};

module.exports = {
	deleteInvoice,
};
