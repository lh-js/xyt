'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const idleMessage = db.collection("idle-message")

	if (event.method == "uploadIdleMessage") {
		let message = {
			messageContent: event.messageContent,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			idleId: event.idleId,
			submitTime: event.submitTime
		}
		return idleMessage.add(message)
	} else if (event.method == "getIdleMessageById") {
		let msg = await idleMessage
			.aggregate()
			.match({
				idleId: event.idleId
			})
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'idle-message', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'beApplyMessageId', //关联字段
				as: 'userMessage_info' //别名
			})
			.end()
		//返回数据给客户端
		return msg
		//返回数据给客户端
		return idleMessage.where(message).orderBy("submitTime", "desc").get()
	} else if (event.method == "uploadUserIdleMessage") {
		let message = {
			applyUserMessage: event.applyUserMessage,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			idleId: event.idleId,
			beApplyUserEmail: event.beApplyUserEmail,
			beApplyUserName: event.beApplyUserName,
			beApplyMessageId: event.beApplyMessageId,
			submitTime: event.submitTime
		}

		return idleMessage.add(message)
	} else if (event.method == "removeMessage") {
		return idleMessage.where({
			idleId: event.idleId
		}).remove()
	}
};
