import request from '/utils/requests.js'

export function getRecommendCategory(params) {
	return request({
		url: '/category/recommend',
		method: 'get',
		params
	})
}

export function getCategory() {
	return request({
		url: '/category/list',
		method: 'get'
	})
}