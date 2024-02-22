import request from '/utils/requests'

export function addCart(data) {
	return request({
		url: '/cart/add',
		method: 'post',
		data
	})
}