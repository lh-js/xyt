'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const dbCmd = db.command
	const $ = db.command.aggregate

	if (event.method == "initIdleClass") {
		let msg = await db.collection('idle-class-one').aggregate()
			.lookup({
				from: 'idle-class-two',
				let: {
					value: '$value'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$parentValue', '$$value']))
					)
					.lookup({
						from: 'idle-class-three',
						let: {
							value: '$value'
						},
						pipeline: $.pipeline()
							.match(
								dbCmd.expr($.eq(['$parentValue', '$$value']))
							)
							.sort({
								value: 1
							})
							.done(),
						as: 'children'
					})
					.sort({
						value: 1
					})
					.done(),
				as: 'children',
			})
			.sort({
				value: 1
			})
			.end()
		//返回数据给客户端
		return msg
	} else if (event.method = "getOneClass") {
		let msg = await db.collection('idle-class-one').aggregate()
			.match({
				value: 1002
			})
			.lookup({
				from: 'idle-class-two',
				let: {
					value: '$value'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr($.eq(['$parentValue', '$$value']))
					)
					.lookup({
						from: 'idle-class-three',
						let: {
							value: '$value'
						},
						pipeline: $.pipeline()
							.match(
								dbCmd.expr($.eq(['$parentValue', '$$value']))
							)
							.sort({
								value: 1
							})
							.done(),
						as: 'children'
					})
					.sort({
						value: 1
					})
					.done(),
				as: 'children',
			})
			.sort({
				value: 1
			})
			.end()
		//返回数据给客户端
		return msg
	}
};
