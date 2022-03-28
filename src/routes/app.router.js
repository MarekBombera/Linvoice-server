const express = require('express');
const {
	httpGetAllInvoices,
	httpAddNewInvoice,
	httpDeleteInvoice,
	httpUpdateInvoiceStatus,
	httpEditInvoice,
} = require('./app.controller');

const appRouter = express.Router();
appRouter.get('/', httpGetAllInvoices);
appRouter.post('/', httpAddNewInvoice);
appRouter.delete('/:invoiceId/delete', httpDeleteInvoice);
appRouter.patch('/:invoiceId/:userId/mark-as-paid', httpUpdateInvoiceStatus);
appRouter.patch('/:invoiceId/:userId/edit-invoice', httpEditInvoice);

module.exports = appRouter;
