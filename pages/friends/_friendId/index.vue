<template>
  <PersonDetail
    :nickname="nickname"
    :latitude="latitude"
    :longitude="longitude"
    :datetime="getDateTime"
    :face-image-url="face_image_url"
  />
</template>

<script>
export default {
  async fetch() {
    const { data } = await this.$axios.get(
      '/api/friends/' + this.$route.params.friendId
    )
    this.nickname = data.nickname
    this.latitude = data.pin ? data.pin.latitude : 0
    this.longitude = data.pin ? data.pin.longitude : 0
    this.datetime = data.pin ? data.pin.datetime : ''
    this.face_image_url = data.face_image_url
  },
  data() {
    return {
      nickname: '',
      latitude: 0,
      longitude: 0,
      datetime: '',
      face_image_url: '',
    }
  },
  computed: {
    getDateTime() {
      return this.$dayjs(this.datetime).format('YYYY/MM/DD HH:mm')
    },
  },
}
</script>
