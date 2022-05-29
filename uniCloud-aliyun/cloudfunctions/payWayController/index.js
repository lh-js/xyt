'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const payway = db.collection("payway")

	if (event.method == "getPayCode") {
		return payway.where({
			email: event.email
		}).get()
	} else if (event.method == "uploadReceiptCode") {
		let data = {
			zfb: event.zfb,
			wx: event.wx,
			email: event.email
		}
		return payway.add(data)
	} else if (event.method == "updateZFBReceiptCode") {
		return payway.where({
			email: event.email
		}).update({
			zfb: event.zfb
		})
	} else if (event.method == "updateWXReceiptCode") {
		return payway.where({
			email: event.email
		}).update({
			wx: event.wx
		})
	}
};
