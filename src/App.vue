<template lang="pug">
div(id="app")
  Container
    Header
    router-view
  .loader(v-if="isLoading")
    .spinner
</template>

<script>
import Container from '@/components/layout/ContainerComponent.vue'
import Header from '@/components/HeaderComponent.vue'
import { auth } from '@/methods/userApiMethods.js'

export default {
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    Container,
    Header
  },
  async mounted () {
    await auth()
    if (this.$store.getters.authUser.email) {
      if (this.$route.path === '/') {
        this.$router.push('/notes')
      }
    }
    this.isLoading = false
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--dark-middle-rgba), 0.7);
  z-index: 1000;
  & .spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
    z-index: 9999;
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
