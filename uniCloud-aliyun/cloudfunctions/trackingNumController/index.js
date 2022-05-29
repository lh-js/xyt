'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const tracking = db.collection("tracking-num");

	if (event.method == "getTrackingNumber") {
		return tracking.where({
			orderId: event.orderId,
			sellerEmail: event.sellerEmail
		}).get()
	} else if (event.method == "uploadTrackingNumber") {
		let data = {
			orderId: event.orderId,
			sellerEmail: event.sellerEmail,
			trackingNum: event.trackingNum,
			trackingState: event.trackingState
		}
		return tracking.add(data)
	} else if (event.method == "updateTrackingNumber") {
		return tracking.where({
			orderId: event.orderId,
			sellerEmail: event.sellerEmail
		}).update({
			trackingNum: event.trackingNum
		})
	} else if (event.method == "makeSureReceipt") {
		return tracking.where({
			orderId: event.orderId,
			sellerEmail: event.sellerEmail
		}).update({
			trackingState: event.trackingState
		})
	}
};
