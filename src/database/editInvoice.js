const { deleteInvoice } = require('./deleteInvoice');
const { insertInvoice } = require('./insertInvoice');

const editInvoice = async (invoiceId, userId, editedInvoice) => {
	await deleteInvoice(invoiceId, userId);
	await insertInvoice(editedInvoice);
};

module.exports = { editInvoice };
