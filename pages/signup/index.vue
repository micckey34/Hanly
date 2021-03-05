<template>
  <div class="wrap">
    <SignUpForm :is-sending="isSending" @submit="submit" />
    <BaseButton to="/" class="mts" is-txt>戻る</BaseButton>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: '',
      isSending: false,
    }
  },
  methods: {
    async submit({ nickname, email, password }) {
      this.isSending = true
      try {
        // 新規登録のAPIリクエスト
        await this.$axios.post('/api/signup', {
          nickname,
          email,
          password,
        })
        this.$router.push('/signin') // $router はルーティング操作 push はそのパスへのリンクを押したときと同じ処理
      } catch (e) {
        // try, catch で try 内でエラーが吐かれたら catch を実行するようにできる
        this.isSending = false
        this.error = '登録済みのメールアドレスです'
        setTimeout(() => {
          // 3秒たったらエラーを消す
          this.error = ''
        }, 3000)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 2.5rem 1rem 0;
}
</style>
