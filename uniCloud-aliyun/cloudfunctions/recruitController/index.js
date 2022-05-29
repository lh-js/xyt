'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const recruit = db.collection("recruit");

	if (event.method == "getRecruit") {
		return recruit.orderBy("submitTime", "desc").get()
	} else if (event.method == "getRecruitById") {
		let recruitinfo = {
			_id: event.id
		}
		let msg = recruit.where(recruitinfo).get()
		//返回数据给客户端
		return msg
	} else if (event.method == "uploadRecruit") {
		let recruitinfo = {
			recruitName: event.recruitName,
			recruitClass: event.recruitClass,
			recruitImg: event.recruitImg,
			address: event.address,
			detailedAddress: event.detailedAddress,
			datetimesingle: event.datetimesingle,
			contactInformationMode: event.contactInformationMode,
			contactInformation: event.contactInformation,
			isRecruitAnonymous: event.isRecruitAnonymous,
			recruitRemarks: event.recruitRemarks,
			recruitLocation: event.recruitLocation,
			recruitState: event.recruitState,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			submitTime: event.submitTime
		}
		let msg = recruit.add(recruitinfo);
		//返回数据给客户端
		return msg
	} else if (event.method == "getMyRecruitCount") {
		let userId = {
			email: event.email
		}
		//返回数据给客户端
		return recruit.where(userId).count()
	} else if (event.method == "getRecruitByUserId") {
		// let userId = {
		// 	email: event.email
		// }
		// //返回数据给客户端
		// return recruit.where(userId).get()
		let msg = await recruit.aggregate()
			.match({
				email: event.email
			})
			.lookup({
				from: 'do-recruit-user', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'recruitId', //关联字段
				as: 'recruit_info' //别名
			})
			.end()

		return msg
	} else if (event.method == "removeRecruit") {
		let msg = recruit.doc(event.id).remove()
		//返回数据给客户端
		return msg
	} else if (event.method == "updateRecruitStateById") {
		let RecruitState = {
			recruitState: event.recruitState,
		}
		return recruit.doc(event.id).update(RecruitState)
	} else if (event.method == "changeIsRecruitAnonymous") {
		let IsRecruitAnonymous = {
			isRecruitAnonymous: event.isRecruitAnonymous
		}
		return recruit.doc(event.id).update(IsRecruitAnonymous)
	} else if (event.method == "getRecruitByAddress") {
		let recruitAddress = {
			address: event.address
		}
		return recruit.where(recruitAddress).get()
	} else if (event.method == "searchRecruit") {
		let RecruitName = {
			recruitName: new RegExp(`${ event.recruitName}`)
		}

		return recruit.where(RecruitName).get()
	}

};
