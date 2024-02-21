import request from '/utils/requests.js'

export function login(data) {
	return request({
		url: '/user/login',
		method: 'post',
		data: data
	})
}