import request from '/utils/requests.js'

export function getBrandInfo(params) {
	return request({
		url: '/brand/info',
		method: 'get',
		params
	})
}