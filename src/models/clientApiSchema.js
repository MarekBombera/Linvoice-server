const clientApiSchema = (invoice, itemList) => {
	const invoiceTemplate = {
		userId: invoice.user_id,
		invoiceId: invoice.invoice_id,
		billFrom: {
			country: invoice.billFrom_country,
			city: invoice.billFrom_city,
			streetAddress: invoice.billFrom_streetAddress,
			postCode: invoice.billFrom_postCode,
		},
		billTo: {
			clientName: invoice.billTo_clientName,
			clientEmail: invoice.billTo_clientEmail,
			country: invoice.billTo_country,
			city: invoice.billTo_city,
			streetAddress: invoice.billTo_streetAddress,
			postCode: invoice.billTo_postCode,
			invoiceDate: invoice.billTo_invoiceDate,
			paymentTerms: invoice.billTo_paymentTerms,
			projectDescription: invoice.billTo_projectDescription,
			status: invoice.billTo_status,
		},
	};
	invoiceTemplate.itemList = itemList;
	return invoiceTemplate;
};

module.exports = {
	clientApiSchema,
};
