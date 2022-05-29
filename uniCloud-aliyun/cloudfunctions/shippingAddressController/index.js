'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const shippingAddress = db.collection("shippingAddress");

	if (event.method == "uploadShippingAddress") {
		let addressInfo = {
			name: event.name,
			phone: event.phone,
			deliveryAddress: event.deliveryAddress,
			detailAddress: event.detailAddress,
			isDefault: event.isDefault,
			email: event.email,
			submitTime: event.submitTime
		}

		return shippingAddress.add(addressInfo)
	} else if (event.method == "getShippingAddress") {
		return shippingAddress.where({
			email: event.email
		}).orderBy('submitTime', 'desc').get()
	} else if (event.method == "getShippingAddressById") {
		return shippingAddress.where({
			_id: event.id
		}).get()
	} else if (event.method == "updateShippingAddress") {
		let addressInfo = {
			name: event.name,
			phone: event.phone,
			deliveryAddress: event.deliveryAddress,
			detailAddress: event.detailAddress,
			isDefault: event.isDefault
		}
		return shippingAddress.doc(event._id).update(addressInfo)
	} else if (event.method == "cancelDefault") {
		return shippingAddress.where({
			email: event.email
		}).update({
			isDefault: false
		})
	} else if (event.method == "getDefaultAddress") {
		return shippingAddress.where({
				email: event.email,
				isDefault: true
			})
			.get()
	} else if (event.method == "getAddressById") {
		return shippingAddress.where({
				_id: event.id
			})
			.get()
	} else if (event.method == "removeAddress") {
		return shippingAddress.doc(event.id).remove()
	}
};
