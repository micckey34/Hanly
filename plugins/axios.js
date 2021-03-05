export default ({ app: { $axios } }) => {
  const token = window.localStorage.getItem('hanly_access_token') // アクセストークンの保存先
  if (token) {
    $axios.setToken(token, 'Bearer')
  }
}
