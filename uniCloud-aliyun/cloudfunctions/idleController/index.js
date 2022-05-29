'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const idle = db.collection("idle");
	const dbCmd = db.command;

	if (event.method == "uploadIdle") {
		let idleInfo = {
			idleName: event.idleName,
			oneClass: event.oneClass,
			twoClass: event.twoClass,
			threeClass: event.threeClass,
			quality: event.quality,
			idleDescribe: event.idleDescribe,
			idlePrice: event.idlePrice,
			isFreeShipping: event.isFreeShipping,
			shippingPrice: event.shippingPrice,
			idleImageList: event.idleImageList,
			idleVideo: event.idleVideo,
			deliveryAddress: event.deliveryAddress,
			idleContactInformationMode: event.idleContactInformationMode,
			idleContactInformation: event.idleContactInformation,
			isIdleAnonymous: event.isIdleAnonymous,
			idleTradingState: event.idleTradingState,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			submitTime: event.submitTime,
			lookCount: event.lookCount,
			stockCount: event.stockCount
		}
		//返回数据给客户端
		return idle.add(idleInfo)
	} else if (event.method == "getAllIdleList") {
		return idle.orderBy("submitTime", "desc").get()
	} else if (event.method == "getIdleById") {
		let idleInfo = {
			_id: event.id
		}
		return idle.where(idleInfo).get()
	} else if (event.method == "getMyIdleCount") {
		return idle.where({
				email: event.email
			})
			.count()
	} else if (event.method == "decreaseStock") {
		return idle.where({
				_id: event.idleId
			})
			.update({
				stockCount: dbCmd.inc(event.amount)
			})
	} else if (event.method == "getIdleByUserId") {
		let msg = await idle
			.aggregate()
			.match({
				email: event.email
			})
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'idle-message', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'idleId', //关联字段
				as: 'message_info' //别名
			})
			.lookup({
				from: 'idle-evaluate', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'idleId', //关联字段
				as: 'evaluate_info' //别名
			})
			.end()
		return msg
	} else if (event.method == "changeIsIdleAnonymous") {
		return idle.doc(event.id).update({
			isIdleAnonymous: event.isIdleAnonymous
		})
	} else if (event.method == "removeIdle") {
		return idle.doc(event.id).remove()
	} else if (event.method == "searchIdle") {
		return idle.where({
			idleName: new RegExp(`${ event.idleName}`)
		}).get()
	} else if (event.method == "getIdleByThreeClass") {
		return idle.where({
			threeClass: parseInt(event.value)
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "getIdleByTwoClass") {
		return idle.where({
			twoClass: parseInt(event.value)
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "getIdleByOneClass") {
		return idle.where({
			oneClass: parseInt(event.value)
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "getIdleByHighPrice") {
		return idle.where({
			idlePrice: dbCmd.gte(event.idlePrice)
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "getIdleByClassOr") {
		return idle.where({
			oneClass: dbCmd.or(dbCmd.eq(1014), dbCmd.eq(1016), dbCmd.eq(1004), dbCmd.eq(1017))
		}).orderBy("submitTime", "desc").get()
	} else if (event.method == "increaseLookCount") {
		return idle.doc(event.id).update({
			lookCount: event.lookCount
		})
	} else if (event.method == "getIdleSortByLookCount") {
		return idle.orderBy("lookCount", "desc").get()
	}
};
