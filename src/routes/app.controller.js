const { insertInvoice } = require('../database/insertInvoice');
const { getAllUserInvoices } = require('../database/getAllUserInvoices');
const { deleteInvoice } = require('../database/deleteInvoice');
const { updateInvoiceStatus } = require('../database/updateInvoiceStatus');
const { editInvoice } = require('../database/editInvoice');

const {
	invoiceRequestValidation,
} = require('../utils/invoiceRequestValidation');
const { invoiceExists } = require('../database/invoiceExists');

const httpGetAllInvoices = async (req, res) => {
	if (!req.query.userId) {
		return res.status(400).json({ error: 'Bad request' });
	}
	await getAllUserInvoices(req.query.userId).then((result) => {
		return res.status(200).json(result);
	});
};

const httpAddNewInvoice = async (req, res) => {
	const invoice = req.body;

	if (invoiceRequestValidation(invoice) === true) {
		await insertInvoice(invoice);
		return res.status(201).json(invoice);
	}
	return res.status(400).json({
		error: 'Missing required invoice property',
	});
};

const httpDeleteInvoice = async (req, res) => {
	const invoiceId = req.params.invoiceId;
	const userId = req.query.userId;
	const invoiceExistsResult = await invoiceExists(invoiceId, userId);

	if (!invoiceExistsResult) {
		return res.status(404).json({ error: 'Invoice not found' });
	}

	return res.status(200).json(await deleteInvoice(invoiceId, userId));
};

const httpUpdateInvoiceStatus = async (req, res) => {
	const { invoiceId, userId } = req.params;
	const invoiceExistsResult = await invoiceExists(invoiceId, userId);

	if (!invoiceExistsResult) {
		return res.status(404).json({ error: 'Invoice not found' });
	}

	await updateInvoiceStatus(invoiceId, userId);
	return res.status(200).json(`Invoice ${invoiceId} has been marked as paid`);
};

const httpEditInvoice = async (req, res) => {
	const { invoiceId, userId } = req.params;
	const editedInvoice = req.body;

	const invoiceExistsResult = await invoiceExists(invoiceId, userId);

	if (!invoiceExistsResult) {
		return res.status(404).json({ error: 'Invoice not found' });
	}
	if (invoiceRequestValidation(editedInvoice) !== true) {
		return res.status(400).json({
			error: 'Missing required invoice property',
		});
	}

	await editInvoice(invoiceId, userId, editedInvoice);
	return res.status(200).json(editedInvoice);
};

module.exports = {
	httpGetAllInvoices,
	httpAddNewInvoice,
	httpDeleteInvoice,
	httpUpdateInvoiceStatus,
	httpEditInvoice,
};
