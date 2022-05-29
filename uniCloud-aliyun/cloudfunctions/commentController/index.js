'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const comment = db.collection("forum-comment")

	if (event.method == "uploadComment") {
		let forumComment = {
			commentContent: event.commentContent,
			commentImg: event.commentImg,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			forumId: event.forumId,
			submitTime: event.submitTime
		}
		let msg = comment.add(forumComment);
		return msg
	} else if (event.method == "getCommentById") {
		let forumComment = {
			forumId: event.forumId
		}
		//返回数据给客户端
		return comment.where(forumComment).orderBy("submitTime", "desc")
			.get()
	} else if (event.method == "uploadUserComment") {
		let forumComment = {
			applyUserComment: event.applyUserComment,
			userCommentImg: event.userCommentImg,
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			forumId: event.forumId,
			beApplyUserEmail: event.beApplyUserEmail,
			beApplyUsername: event.beApplyUsername,
			beApplyCommentid: event.beApplyCommentid,
			submitTime: event.submitTime
		}
		let msg = comment.add(forumComment);
		return msg
	} else if (event.method == "getUserComment") {
		let forumComment = {
			beApplyCommentid: event.beApplyCommentid
		}
		//返回数据给客户端
		return comment.where(forumComment).orderBy("submitTime", "desc").get()
	} else if (event.method == "removeComment") {
		let forumId = {
			forumId: event.forumId
		}
		let msg = comment.where(forumId).remove()
		//返回数据给客户端
		return msg
	}
};
