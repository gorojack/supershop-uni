import request from '/utils/requests.js'

export function login(data) {
	return request({
		url: '/user/login',
		method: 'post',
		data: data
	})
}

export function register(data) {
	return request({
		url: '/user/register',
		method: 'post',
		data: data
	})
}

export function getUserInfo() {
	return request({
		url: '/user/info',
		method: 'get',
	})
}

export function checkUsername(params) {
	return request({
		url: '/user/check/username',
		method: 'get',
		params
	})
}

export function code(params) {
	return request({
		url: '/user/code',
		method: 'get',
		params
	})
}