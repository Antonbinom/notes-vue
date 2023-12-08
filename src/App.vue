<template lang="pug">
div(id="app")
  Container
    Header
    router-view
</template>

<script>
import Container from '@/components/layout/ContainerComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import { auth } from '@/methods/userApiMethods.js'

export default {
  components: {
    Container,
    Header
  },
  mounted () {
    auth()
    if (this.$store.getters.authUser.email) {
      this.$router.push('/notes')
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
}
</style>
