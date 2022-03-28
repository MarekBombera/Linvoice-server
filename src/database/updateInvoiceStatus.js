const { promisePool, escape } = require('./mysql');

const updateInvoiceStatus = async (invoiceId, userId) => {
	const updateStatusQuery = `
	UPDATE invoices
   SET billTo_status = 'paid'
   WHERE invoice_id = ${escape(invoiceId)}
	AND user_id = ${escape(userId)};`;

	await promisePool.execute(updateStatusQuery);
};

module.exports = { updateInvoiceStatus };
