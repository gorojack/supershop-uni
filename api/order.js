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

export function listOrder(params) {
	return request({
		url: '/order/list',
		method: 'get',
		params
	})
}

export function getAllStatus() {
	return request({
		url: '/order/status',
		method: 'get'
	})
}