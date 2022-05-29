'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const cart = db.collection("shoppingcar");
	const $ = db.command.aggregate;
	const dbCmd = db.command

	if (event.method == "uploadIdleToCart") {
		let shoppingcarData = {
			idleId: event.idleId,
			idleCover: event.idleCover,
			idleName: event.idleName,
			idleDescribe: event.idleDescribe,
			quality: event.quality,
			idlePrice: event.idlePrice,
			idleUserEmail: event.idleUserEmail,
			idleUserName: event.idleUserName,
			myEmail: event.myEmail,
			amount: event.amount,
			stockCount: event.stockCount,
			isChecked: event.isChecked,
			submitTime: event.submitTime
		}

		//返回数据给客户端
		return cart.add(shoppingcarData)
	} else if (event.method == "getShoppingCarData") {
		let msg = cart
			.aggregate()
			.match({
				myEmail: event.myEmail
			})
			.group({
				_id: '$idleUserEmail',
				submitTime: $.first('$submitTime'),
				ischecked: $.sum('$isChecked')
			})
			.lookup({
				from: 'shoppingcar',
				let: {
					id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$idleUserEmail', '$$id']))
					)
					.match({
						myEmail: event.myEmail,
					})
					.sort({
						submitTime: -1
					})
					.done(),
				as: 'shopingcar_info',
			})
			.sort({
				submitTime: -1
			})
			.end()
		return msg;
	} else if (event.method == "getAllCount") {
		let allCount = cart.where({
			myEmail: event.myEmail
		}).count()

		return allCount
	} else if (event.method == "getCheckedCount") {
		let checkedCount = cart.where({
			isChecked: 1,
			myEmail: event.myEmail
		}).count()

		return checkedCount
	} else if (event.method == "cancelOrCheckedItem") {
		let check = {
			isChecked: event.isChecked
		}
		return cart.doc(event.id).update(check)
	} else if (event.method == "cancelOrCheckedIdleUser") {
		let check = {
			isChecked: event.isChecked
		}
		let email = {
			idleUserEmail: event.id,
			myEmail: event.myEmail
		}
		return cart.where(email).update(check)
	} else if (event.method == "cancelOrAllCheck") {
		let check = {
			isChecked: event.isChecked,
		}
		return cart.where({
			myEmail: event.myEmail
		}).update(check)
	} else if (event.method == "changeIdleAmount") {
		let Amount = {
			amount: event.amount
		}
		return cart.doc(event._id).update(Amount)
	} else if (event.method == "getTotalPrice") {
		return cart.aggregate()
			.match({
				isChecked: 1,
				myEmail: event.myEmail
			})
			.addFields({
				price: $.multiply(['$idlePrice', '$amount'])
			})
			.group({
				_id: 1,
				totalPrice: $.sum('$price')
			})
			.end()
	} else if (event.method == "getShoppingcarDataByIdleId") {
		let idleID = {
			idleId: event.idleId,
			myEmail: event.myEmail
		}
		return cart.where(idleID).get()
	} else if (event.method == "updateShoppingcarDataAmount") {
		let idleID = {
			idleId: event.idleId
		}
		return cart.where(idleID).update({
			amount: event.amount
		})
	} else if (event.method == "removeShoppingcarChecked") {
		return cart.where({
				isChecked: 1,
			})
			.remove()
	} else if (event.method == "getCheckedData") {
		let msg = cart
			.aggregate()
			.match({
				myEmail: event.myEmail,
				isChecked: dbCmd.gte(1)
			})
			.addFields({
				price: $.multiply(['$idlePrice', '$amount'])
			})
			.group({
				_id: '$idleUserEmail',
				submitTime: $.first('$submitTime'),
				ischecked: $.sum('$isChecked'),
				totalPrice: $.sum('$price')
			})
			.lookup({
				from: 'shoppingcar',
				let: {
					id: '$_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$idleUserEmail', '$$id']))
					)
					.match({
						myEmail: event.myEmail,
						isChecked: 1
					})
					.sort({
						submitTime: -1
					})
					.done(),
				as: 'shopingcar_info',
			})
			.sort({
				submitTime: -1
			})
			.end()
		return msg;
	} else if (event.method == "getTotalSum") {
		return cart.aggregate()
			.match({
				isChecked: 1,
				myEmail: event.myEmail
			})
			.addFields({
				sum: '$amount'
			})
			.group({
				_id: 1,
				totalSum: $.sum('$sum')
			})
			.end()
	}

};
