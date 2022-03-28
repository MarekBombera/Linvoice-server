const invoiceRequestValidation = (props) => {
	const { userId, invoiceId, billFrom, billTo, itemList } = props;
	const userIdVal = userIdValidation(userId);
	const invoiceIdVal = invoiceIdValidation(invoiceId);
	const billFromVal = billFromValidation(billFrom);
	const billToVal = billToValidation(billTo);
	const itemListVal = itemListValidation(itemList);
	const formKeyLengthVal = formKeyLengthValidation(props);
	if (
		formKeyLengthVal &&
		userIdVal &&
		invoiceIdVal &&
		billFromVal &&
		billToVal &&
		itemListVal
	) {
		return true;
	}
	return false;
};

const formKeyLengthValidation = (allProps) => {
	if (Object.keys(allProps).length !== 5) {
		return false;
	}
	return true;
};

const userIdValidation = (userId) => {
	if (!userId && typeof userId !== 'string') {
		return false;
	}
	return true;
};

const invoiceIdValidation = (invoiceId) => {
	if (!invoiceId) {
		return false;
	}
	if ((typeof invoiceId !== 'string') & (invoiceId.length !== 6)) {
		return false;
	}
	return true;
};

const billFromValidation = (billFrom) => {
	if (!billFrom && Object.keys(billFrom).length !== 4) {
		return false;
	}
	for (let x in billFrom) {
		if (typeof billFrom[x] !== 'string' && billFrom[x].length > 0) {
			return false;
		}
	}
	return true;
};

const billToValidation = (billTo) => {
	if (!billTo && Object.keys(billTo).length !== 10) {
		return false;
	}

	for (let x in billTo) {
		if (typeof billTo[x] !== 'string' && billTo[x].length > 0) {
			return false;
		}
	}
	return true;
};

const itemListValidation = (itemList) => {
	if (!itemList) {
		return false;
	}

	for (let item of itemList) {
		if (Object.keys(item).length !== 3) {
			return false;
		}
		if (typeof item.itemName !== 'string' && item.itemName.length > 0) {
			return false;
		}
		if (typeof item.quantity !== 'number' && typeof item.price !== 'number') {
			return false;
		}
	}
	return true;
};

module.exports = {
	invoiceRequestValidation,
};
