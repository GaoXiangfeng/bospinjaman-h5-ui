import axios from '../service/http.service'
import Api from '../config'
import qs from 'qs'
const ApiBaseUrl = Api.env.ApiBaseUrl;
module.exports = {
	downlaod (param) {
		return axios.post(`${ApiBaseUrl}/ex/channel/downloadUrl`, param)
	},
}
