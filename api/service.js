import request from '/utils/requests.js'

export function getBanner() {
	return request({
		url: '/service/banner',
		method: 'get'
	})
}