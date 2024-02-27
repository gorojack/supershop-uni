import request from '/utils/requests.js'

export function confirmOrder(data) {
	return request({
		url: '/order/confirm',
		method: 'post',
		data
	})
}

export function createOrder(data) {
	return request({
		url: '/order/create',
		method: 'post',
		data
	})
}