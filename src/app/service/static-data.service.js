const ua = window.navigator.userAgent.toLowerCase()
// console.log(window.navigator.userAgent)
export default {
	isApp: ua.indexOf('xyqb') != -1,
	isAndroid: ua.indexOf('android') > -1,
	isIOS: ua.indexOf('iphone') > -1,
	isWeiXin: ua.match(/micromessenger/i) == "micromessenger"
};
