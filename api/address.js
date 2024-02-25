import request from '/utils/requests.js'

export function listAddress() {
	return request({
		url: '/address/list',
		method: 'get'
	})
}

export function addAddress(data) {
	return request({
		url: '/address/add',
		method: 'post',
		data
	})
}