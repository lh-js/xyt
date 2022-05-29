'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const lostItem = db.collection("lost_item");

	if (event.method == "getLostItem") {
		return lostItem.orderBy("submitTime", "desc").get()
	} else if (event.method == "getLostItemById") {
		let lostIteminfo = {
			_id: event.id
		}
		let msg = lostItem.where(lostIteminfo).get()
		//返回数据给客户端
		return msg
	} else if (event.method == "uploadLostItem") {
		let lostIteminfo = {
			lostName: event.lostName,
			lostClass: event.lostClass,
			lostImg: event.lostImg,
			lostAddress: event.lostAddress,
			lostDetailedAddress: event.lostDetailedAddress,
			lostDatetimesingle: event.lostDatetimesingle,
			lostContactInformationMode: event.lostContactInformationMode,
			lostContactInformation: event.lostContactInformation,
			isLostAnonymous: event.isLostAnonymous,
			LostRemarks: event.LostRemarks,
			lostState: event.lostState,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			submitTime: event.submitTime
		}
		let msg = lostItem.add(lostIteminfo);
		//返回数据给客户端
		return msg
	} else if (event.method == "getMyLostCount") {
		let userId = {
			email: event.email
		}
		//返回数据给客户端
		return lostItem.where(userId).count()
	} else if (event.method == "getLostByUserId") {
		let msg = await lostItem.aggregate()
			.match({
				email: event.email
			})
			.lookup({
				from: 'return-lost-user', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'lostId', //关联字段
				as: 'retrunLost_info' //别名
			})
			.end()
		return msg
	} else if (event.method == "removeLost") {
		let msg = lostItem.doc(event.id).remove()
		//返回数据给客户端
		return msg
	} else if (event.method == "updateLostStateById") {
		let LostState = {
			lostState: event.lostState,
		}
		return lostItem.doc(event.id).update(LostState)
	} else if (event.method == "changeIsLostAnonymous") {
		let IsLostAnonymous = {
			isLostAnonymous: event.isLostAnonymous
		}
		return lostItem.doc(event.id).update(IsLostAnonymous)
	} else if (event.method == "getLostByAddress") {
		let LostAddress = {
			lostAddress: event.address
		}
		return lostItem.where(LostAddress).get()
	} else if (event.method == "searchLost") {
		let LostName = {
			lostName: new RegExp(`${ event.lostName}`)
		}

		return lostItem.where(LostName).get()
	}
};
