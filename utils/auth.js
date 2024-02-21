const TokenKey = 'supershop_token'

export function getToken() {
  return uni.getStorageSync(TokenKey)
}

export function setToken(token) {
  uni.setStorageSync(TokenKey, token)
}

export function removeToken() {
  uni.setStorageSync(TokenKey, null)
}
