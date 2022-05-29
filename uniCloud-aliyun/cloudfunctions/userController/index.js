'use strict';
exports.main = async (event, context) => {

	const db = uniCloud.database();
	const user = db.collection("user")

	if (event.method == "getUserInfo") {
		let userinfo = {
			email: event.email
		}
		let msg = user.where(userinfo).get();
		return msg
	} else if (event.method == "registerUser") {
		let userinfo = {
			email: event.email,
			userName: event.userName,
			pwd: event.pwd,
			userAvatar: event.userAvatar,
			sex: event.sex,
			city: event.city,
			homeDetail: event.homeDetail,
			school: event.school,
			autograph: event.autograph
		}
		let msg = user.add(userinfo);
		return msg
	} else if (event.method == "getUserInfoById") {
		let userinfo = {
			_id: event.id
		}
		let msg = user.where(userinfo).get();
		return msg
	} else if (event.method == "updateUserMsg") {
		let UserInfo = {
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			sex: event.sex,
			city: event.city,
			homeDetail: event.homeDetail,
			school: event.school,
			autograph: event.autograph,
		}
		let msg = user.doc(event.id).update(UserInfo)
		return msg
	} else if (event.method == "loginUser") {
		let userinfo = {
			email: event.email,
			pwd: event.pwd
		}
		let msg = user.where(userinfo).get();
		//返回数据给客户端
		return msg
	} else if (event.method == "updatePWD") {
		let UserInfo = {
			pwd: event.pwd
		}
		let msg = user.where({
			email: event.email
		}).update(UserInfo)
		//返回数据给客户端
		return msg
	} else if (event.method == "updateUserMsgByemail") {
		let UserInfo = {
			userAvatar: event.userAvatar,
			userName: event.userName,
			email: event.email,
			sex: event.sex,
			city: event.city,
			homeDetail: event.homeDetail,
			school: event.school,
			autograph: event.autograph
		}
		let msg = user.where({
			email: event.email
		}).update(UserInfo)
		//返回数据给客户端
		return msg
	}
};
