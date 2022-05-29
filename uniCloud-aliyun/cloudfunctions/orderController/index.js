'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const order = db.collection("order")
	const dbCmd = db.command

	if (event.method == "uploadOrder") {
		let orderInfo = {
			buyerEmail: event.buyerEmail,
			sellerEmail: event.sellerEmail,
			uploadSellerEmail: event.uploadSellerEmail,
			shipEmailList: event.shipEmailList,
			receiptEmailList: event.receiptEmailList,
			idleIdList: event.idleIdList,
			evaluateIdleIdList: event.evaluateIdleIdList,
			itemNum: event.itemNum,
			totalPrice: event.totalPrice,
			payWay: event.payWay,
			remark: event.remark,
			goodsInfo: event.goodsInfo,
			addressInfo: event.addressInfo,
			orderState: event.orderState,
			submitTime: event.submitTime
		}
		return order.add(orderInfo)
	} else if (event.method == "getMySellOrder") {
		// return order.where({
		// 	sellerEmail: event.email,
		// 	orderState: event.orderState
		// }).orderBy("submitTime", "desc").get()
		let msg = order.aggregate()
			.match({
				sellerEmail: event.email,
				orderState: event.orderState
			})
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'user', //要联查哪个表
				localField: 'buyerEmail', //本表字段
				foreignField: 'email', //关联字段
				as: 'user_info' //别名
			})
			.end()
		//返回数据给客户端
		return msg
	} else if (event.method == "getMyBuyOrder") {
		return order.where({
			buyerEmail: event.email,
			orderState: event.orderState
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "payOrder") {
		return order.doc(event._id).update({
			uploadSellerEmail: dbCmd.push(event.payEmail)
		})
	} else if (event.method == "makeSureOrderReceipt") {
		return order.doc(event.orderId).update({
			orderState: event.orderState
		})
	} else if (event.method == "removeOrder") {
		return order.doc(event.id).remove()
	} else if (event.method == "completeEvaluation") {
		return order.doc(event.orderId).update({
			orderState: event.orderState
		})
	} else if (event.method == "addEvaluate") {
		return order.doc(event.orderId).update({
			evaluateIdleIdList: dbCmd.push(event.idleId)
		})
	} else if (event.method == "addTrackingNumber") {
		return order.doc(event.orderId).update({
			shipEmailList: dbCmd.push(event.sellerEmail)
		})
	} else if (event.method == "addReceipt") {
		return order.doc(event.orderId).update({
			receiptEmailList: dbCmd.push(event.sellerEmail)
		})
	} else if (event.method == "applyAfterSales") {
		return order.doc(event.orderId).update({
			orderState: event.orderState
		})
	}
};
