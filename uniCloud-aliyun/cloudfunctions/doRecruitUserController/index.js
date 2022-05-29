'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const doRecruit = db.collection("do-recruit-user");

	if (event.method == "uploadDoRecruitUser") {
		let doRecruitUser = {
			recruitId: event.recruitId,
			recruitUserEmail: event.recruitUserEmail,
			myUserAvatar: event.myUserAvatar,
			myUserName: event.myUserName,
			myEmail: event.myEmail,
			submitTime: event.submitTime,
			doRecruitTime: event.doRecruitTime,
			doRecruitState: event.doRecruitState,
			remark: event.remark
		}

		//返回数据给客户端
		return doRecruit.add(doRecruitUser)
	}
	// else if (event.method == "getDoRecruitUserById") {
	// 	let recruitId = {
	// 		recruitId: event.id
	// 	}

	// 	return doRecruit.where(recruitId).get()
	// }
	else if (event.method == "updateDoRecruitStateById") {
		let doRecruitUser = {
			doRecruitTime: event.doRecruitTime,
			doRecruitState: event.doRecruitState,
		}
		return doRecruit.doc(event.id).update(doRecruitUser)
	} else if (event.method == "checkDoUserEmail") {
		let doRecruitUser = {
			myEmail: event.myEmail,
			recruitId: event.recruitId
		}
		return doRecruit.where(doRecruitUser).get()
	} else if (event.method == "removeDoRecruitUser") {
		let doRecruitUser = {
			recruitId: event.recruitId
		}
		return doRecruit.where(doRecruitUser).remove()
	}
};
