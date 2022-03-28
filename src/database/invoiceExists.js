const { promisePool, escape } = require('./mysql');

const invoiceExists = async (invoiceId, userId) => {
	const invoiceQuery = `
	SELECT user_id, invoice_id FROM invoices  
   WHERE invoice_id = ${escape(invoiceId)}
	 AND user_id = ${escape(userId)};`;

	const [invoiceResult] = await promisePool.query(invoiceQuery);

	if (invoiceResult.length === 0) {
		return false;
	}
	return true;
};

module.exports = { invoiceExists };
