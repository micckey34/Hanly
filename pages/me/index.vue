<template>
  <div>
    <PersonDetail
      :nickname="nickname"
      :latitude="latitude"
      :longitude="longitude"
      :datetime="getDateTime"
      :face-image-url="face_image_url"
      editable
    />
    <BaseButton is-txt @click="logout">ログアウト</BaseButton>
  </div>
</template>

<script>
export default {
  computed: {
    getDateTime() {
      return this.$dayjs(this.datetime).format('YYYY/MM/DD HH:mm')
    },
    nickname() {
      return this.$store.getters['me/nickname']
    },
    latitude() {
      return this.$store.getters['me/latitude']
    },
    longitude() {
      return this.$store.getters['me/longitude']
    },
    datetime() {
      return this.$store.getters['me/datetime']
    },
    face_image_url() {
      return this.$store.getters['me/face_image_url']
    },
    // ...mapGetters('me',['nickname','latitude','longitude','datetime','face_image_url'])
  },
  methods: {
    logout() {
      window.localStorage.setItem('hanly_access_token', '')
      this.$router.push('/')
    },
    handleUploaded(res) {
      this.isUploading = false
      this.$store.commit('me/updateImage', {
        face_image_url: res.face_image_url + '?ts=' + new Date().getTime(),
      })
    },
  },
}
</script>
