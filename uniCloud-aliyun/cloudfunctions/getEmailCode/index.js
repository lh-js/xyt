'use strict';
var nodemailer = require('nodemailer');
exports.main = async (event, context) => {
	//event参数表:
	//method请求方法名: 
	//sendCode 发送验证码,并且返回主键,数据库中会保存,用于校验验证码 
	//sendCustom 用于发送自定义邮件,比如注册成功之类的, 数据库不做保存,如果想保存.此类邮件也可以用sendCode方法.就会自动保存
	//validateCode 用于校验用户发送的验证码是否正确与sendCode和sendCustom不同的是,需要在event中传参多四个:code, 填写的验证码,email,发送的邮箱,codeId,用记查询发送的短信验证码,effectiveTime,验证码的有效时间,以秒为短信,比如5分钟则传300
	//serviceType,要发送的服务类型.qq为QQ邮箱,ali为阿里邮箱
	//html发送邮件的内容. 请在event.html中自己编写发送邮件的内容,如果是发送验证码的话也要编写内容.但是验证码字段要在内容中写上#code#,如:感谢您注册XXX,您的验证码是#code#,请勿泄漏给他人,
	//email为接收邮件的地址
	//subject为邮件的标题
	//method:sendCode发送验证码,sendCustom发送自定义内容邮件(自定义内容邮件不在云数据库做存储,不做校验),validateCode,校验验证码
	//codeId:校验验证码的ID,此ID会在发送验证码成功后返回给前台
	//参数示例:
	// var eventDemo = {
	// 	serviceType: 'qq',
	// 	method: 'sendCode',
	// 	html: '感谢您注册,注册码是#code#',
	// 	email: '75754567@qq.com',
	// 	subject: '注册验证码'
	// }
	//随机生成验证码方法.默认六位数字.如果有其它的要求请自己修改,比如数字字母混合验证
	var getRandomCode = function() {
		return ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
	}

	//发送邮件主方法
	var send = (data, code, codeString) => {
		var emailConfig = {
			qq: {
				host: 'smtp.qq.com',
				port: 465,
				secure: true,
				auth: {
					user: '2731164534@qq.com',//此处填写要发送邮件的QQ邮箱
					pass: 'timrvljolkcsdedd'//此处请自行生成并填写 //注意此处并不是QQ密码,而是QQ邮箱中成功开启POP3/SMTP服务,拿到的授权码,重要的事件说三遍,不是QQ密码,是QQ授权码!不是QQ密码,是QQ授权码!不是QQ密码,是QQ授权码!
				}
			}
		}
		// data为客户端上传的参数
		let transporter = nodemailer.createTransport({
			"host": emailConfig[data.serviceType].host,
			"port": emailConfig[data.serviceType].port,
			"secure": emailConfig[data.serviceType].secure, // use SSL
			"auth": emailConfig[data.serviceType].auth
		});

		let mailOptions = {
			from: emailConfig[data.serviceType].auth.user,
			to: data.email,
			subject: data.subject,
			text: code ? data.html.replace('#code#', codeString) : data.html
		};
		var res = transporter.sendMail(mailOptions);
		if (code) {
			res.code = codeString;
		}
		return res;
	}
	switch (event.method) {
		case 'sendCode':
			//随机生成验证码并发送
			var codeString = getRandomCode();
			var res = await send(event, true, codeString);
			console.log(res)
			var result = {
				status: 0
			}
			if (res.accepted.length == 1) {
				const collection = uniCloud.database().collection('emailCode');
				event.validate = 0;
				event.validateString = codeString;
				event.timestamp = new Date().getTime();
				console.log(event)
				result = await collection.add(event);
				result.status = 1;
			}
			console.log(result)
			return result;
			break;
		case 'sendCustom':
			var res = await send(event);
			var result = {
				status: 0
			}
			if (res.accepted.length == 1) {
				result.status = 1;
			}
			//自定义邮件不做保存.直接发送
			return result;
			break;
		case 'validateCode':
			//返回status: -5验证失败,-4验证码已使用,-3验证码已失效,-2当前邮箱未发送验证码(用户用一个邮箱发送了验证码然后提交验证码的时候又换了个邮箱) -1 还未发送验证码 0 验证码不正确 1 验证码通过 
			//通过ID查询当前验证码信息
			const collection = uniCloud.database().collection('emailCode');
			const now = new Date().getTime();
			var res = await collection.doc(event.codeId).get();
			var result = {

			}
			if (res.affectedDocs == 1) {
				if (res.data[0].email && event.email != res.data[0].email) {
					//-2当前邮箱未发送验证码
					result.status = -2;
				} else if (res.data[0].validate > 0) {
					//-4验证码已使用
					result.status = -4;
				} else if (now - res.data[0].timestamp > event.effectiveTime * 1000) {
					//-3验证码已失效
					result.status = -3;
				} else if (event.code != res.data[0].validateString) {
					//0验证码不正确
					result.status = 0;
				} else {

					//验证通过以后.将此条验证码的validate由0修改为1
					var res = await collection.doc(event.codeId).update({
						validate: 1
					})
					if (res.affectedDocs == 1) {
						//1验证码通过
						result.status = 1;
					} else {
						//更新验证码失败.为避免漏洞.此处返回-5验证失败 一般不会用到...除非数据被人为此时删掉了...
						result.status = -5
					}
				}
			} else {
				//-1一般是未发送验证码.
				result.status = -1;
			}
			return result;
			break;
		default:
			return {status:-5};
			break;
	}

};
