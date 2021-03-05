// context に redirect というリダイレクトしてくれる関数が入ってるので、それを使ってトークンがなかった場合ログインページへリダイレクトします
export default async function ({ store, redirect, route, app: { $axios } }) {
  if (
    route.path === '/' ||
    route.path === '/signin' ||
    route.path === '/signup'
  ) {
    return
  }
  const token = window.localStorage.getItem('hanly_access_token')
  if (!token) {
    // トークンがない＝ユーザーが認証されていない
    return redirect('/signin')
  }
  const { data } = await $axios.get('/api/me')
  store.commit('me/setMe', data)
}
