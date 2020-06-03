const protocol = window.location.protocol
let apiHost = protocol + '//192.168.28.51:9006'//开发
// let apiHost = `${protocol}//pinja-api-dongmeifeng1.q-gp.com`//测试
// let apiHost = `${protocol}//pinjaman-api.uanguang.com`//线上
module.exports = {
	ApiBaseUrl: apiHost,
}
