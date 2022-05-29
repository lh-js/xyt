'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const notice = db.collection("school-notice");
	if (event.method == "getSchoolNoticeList") {
		return notice.orderBy("submitTime", "desc").get()
	} else if (event.method == "getSchoolNoticeById") {
		return notice.where({
			_id: event.id
		}).get()
	}
};
