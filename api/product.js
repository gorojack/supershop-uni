import request from '/utils/requests.js'

export function getRecommendProduct(params) {
	return request({
		url: '/product/recommend',
		method: 'get',
		params
	})
}

export function getProductByNdCategoryId(params) {
	return request({
		url: '/product/listNdC',
		method: 'get',
		params
	})
}