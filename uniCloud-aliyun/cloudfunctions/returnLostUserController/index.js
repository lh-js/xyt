'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const returnLost = db.collection("return-lost-user");

	if (event.method == "uploadReturnLostUser") {
		let returnLostUser = {
			lostId: event.lostId,
			lostUserEmail: event.lostUserEmail,
			myUserAvatar: event.myUserAvatar,
			myUserName: event.myUserName,
			myEmail: event.myEmail,
			submitTime: event.submitTime,
			returnLostTime: event.returnLostTime,
			returnLostState: event.returnLostState,
			remark: event.remark,
		}

		return returnLost.add(returnLostUser)
	} else if (event.method == "checkReturnLostUserEmail") {
		let returnLostUser = {
			myEmail: event.myEmail,
			lostId: event.lostId
		}
		return returnLost.where(returnLostUser).get()
	} else if (event.method == "updatereturnLostStateById") {
		let returnLostUser = {
			returnLostTime: event.returnLostTime,
			returnLostState: event.returnLostState
		}
		return returnLost.doc(event.id).update(returnLostUser)
	} else if (event.method == "removeReturnLostUser") {
		let returnLostUser = {
			lostId: event.lostId
		}
		return returnLost.where(returnLostUser).remove()
	}
};
