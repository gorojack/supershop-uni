export let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.0.10:8080/v1/api'
}
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
}
