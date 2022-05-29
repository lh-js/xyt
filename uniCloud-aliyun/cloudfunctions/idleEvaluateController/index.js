'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const idleEvaluate = db.collection("idle-evaluate")

	if (event.method == "uploadEvaluate") {
		let evaluate = {
			orderId: event.orderId,
			idleId: event.idleId,
			buyerEmail: event.buyerEmail,
			idleCover: event.idleCover,
			idleName: event.idleName,
			idleScore: event.idleScore,
			idleScoreDescription: event.idleScoreDescription,
			idleImageList: event.idleImageList,
			submitTime: event.submitTime
		}

		return idleEvaluate.add(evaluate)
	} else if (event.method == "getEvaluateList") {
		let msg = await idleEvaluate
			.aggregate()
			.match({
				idleId: event.idleId
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
		return msg
	} else if (event.method == "removeEvaluate") {
		return idleEvaluate.where({
			idleId: event.idleId
		}).remove()
	}
};
