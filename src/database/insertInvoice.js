const { promisePool, escape } = require('./mysql');

const insertInvoice = async (invoice) => {
	const { userId, invoiceId, billFrom, billTo, itemList } = invoice;
	const { country, city, streetAddress, postCode } = billFrom;
	const {
		clientName,
		clientEmail,
		invoiceDate,
		paymentTerms,
		projectDescription,
		status,
	} = billTo;

	const billFromInsert = `billFrom_country, billFrom_city, billFrom_streetAddress, billFrom_postCode`;
	const billToInsert = `billTo_clientName, billTo_clientEmail, billTo_country, billTo_city, billTo_streetAddress, billTo_postCode, billTo_invoiceDate, billTo_paymentTerms, billTo_projectDescription, billTo_status`;

	const billFromValues = `
	${escape(country)},
	${escape(city)},
	${escape(streetAddress)},
	${escape(postCode)}`;

	const billToValues = `
	${escape(clientName)},
	${escape(clientEmail)},
	${escape(billTo.country)},
	${escape(billTo.city)},
	${escape(billTo.streetAddress)},
	${escape(billTo.postCode)},
	${escape(invoiceDate)},
	${escape(paymentTerms)},
	${escape(projectDescription)},
	${escape(status)}`;

	const insertIntoInvoices = `
	INSERT INTO invoices (user_id, invoice_id, ${billFromInsert}, ${billToInsert})
	VALUES (${escape(userId)},
			${escape(invoiceId)},
			${billFromValues},
	 		${billToValues});`;

	await promisePool.execute(insertIntoInvoices);

	const insertItemList = async (userId, invoiceId, itemList) => {
		itemList.forEach(async ({ itemName, quantity, price }) => {
			const itemQuery = `
			INSERT INTO itemList (user_id, invoice_id, itemName, quantity, price)
			VALUES (${escape(userId)},
					${escape(invoiceId)},
					${escape(itemName)},
					${escape(quantity)},
					${escape(price)});
	`;

			await promisePool.execute(itemQuery);
		});
	};

	await insertItemList(userId, invoiceId, itemList);
};

module.exports = {
	insertInvoice,
};
