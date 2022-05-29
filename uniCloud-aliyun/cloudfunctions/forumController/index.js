'use strict';
exports.main = async (event, context) => {

	const db = uniCloud.database();
	const learningForum = db.collection("learning_forum");

	if (event.method == "getAllLearningForum") {
		let msg = await learningForum
			.aggregate()
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'forum-comment', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'forumId', //关联字段
				as: 'comment_info' //别名
			})
			.end()
		return msg
	} else if (event.method == "getLearnForumByClass") {
		// let learningForumClass = {
		// 	forumClass: event.forumClass
		// }
		let msg = await learningForum
			.aggregate()
			.match({
				forumClass: event.forumClass
			})
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'forum-comment', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'forumId', //关联字段
				as: 'comment_info' //别名
			})
			.end()
		//返回数据给客户端
		return msg
	} else if (event.method == "searchForum") {
		// let forum = {
		// 	forumTitle: new RegExp(`${ event.forumTitle}`)
		// }
		let msg = await learningForum
			.aggregate()
			.match({
				forumTitle: new RegExp(`${ event.forumTitle}`)
			})
			.lookup({
				from: 'forum-comment', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'forumId', //关联字段
				as: 'comment_info' //别名
			})
			.end()
		return msg
	} else if (event.method == "getLearningForumById") {
		let forum = {
			_id: event._id
		}
		return learningForum.where(forum).get()
	} else if (event.method == "uploadForum") {
		let forum = {
			forumTitle: event.forumTitle,
			forumClass: event.forumClass,
			forumContent: event.forumContent,
			forumCover: event.forumCover,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			submitTime: event.submitTime,
			lookCount: event.lookCount,
		}
		let msg = learningForum.add(forum);
		//返回数据给客户端
		return msg
	} else if (event.method == "getLearningForumByUserId") {
		// let learningForumClass = {
		// 	email: event.email
		// }
		let msg = await learningForum
			.aggregate()
			.match({
				email: event.email
			})
			.sort({
				submitTime: -1
			})
			.lookup({
				from: 'forum-comment', //要联查哪个表
				localField: '_id', //本表字段
				foreignField: 'forumId', //关联字段
				as: 'comment_info' //别名
			})
			.end()
		//返回数据给客户端
		return msg
	} else if (event.method == "removeForum") {
		let msg = learningForum.doc(event.id).remove()
		//返回数据给客户端
		return msg
	} else if (event.method == "getMyforumCount") {
		let learningForumClass = {
			email: event.email
		}
		//返回数据给客户端
		return learningForum.where(learningForumClass).count()
	} else if (event.method == "increaseLookCount") {
		let LookCount = {
			lookCount: event.lookCount
		}
		return learningForum.doc(event.id).update(LookCount)
	} else if (event.method == "sortForumByLookCount") {
		return learningForum.orderBy("lookCount", "desc").limit(3).get()
	}
};
