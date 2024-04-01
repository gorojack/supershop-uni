import axios from 'axios'
import adapter from 'axios-miniprogram-adapter'
import {
	getToken,
	removeToken
} from '/utils/auth.js'

import {
	baseUrl
} from '/config'

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	adapter: adapter
})

instance.interceptors.request.use(
	config => {
		if (config.method === 'get') {
			const params = config.params
			let suffix = ''
			for (const key in params) {
				if (params[key] !== '' && params[key] !== undefined) {
					suffix += '/' + params[key]
				}
			}
			config.url += suffix
			config.params = {}
		}
		if (getToken()) {
			config.headers['token'] = getToken()
		}

		return config
	}, error => {
		console.log('request error: ' + error)
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code !== 1000) {
			uni.showToast({
				title: res.msg || "网络错误",
				icon: 'error'
			})

			if (res.code === 2001 || res.code === 2002) {
				uni.showToast({
					title: res.msg || "登录过期",
					icon: 'error'
				})
				removeToken()
			}
			return Promise.reject(res.msg || "服务器错误")
		} else {
			return res
		}
	}, error => {
		console.log('response error: ' + error)
		uni.showToast({
			title: '网络错误',
			icon: 'error'
		})
		return Promise.reject(error)
	}
)

export default instance