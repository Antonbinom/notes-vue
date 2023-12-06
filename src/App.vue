<template lang="pug">
div(id="app")
  Layout
  nav
    router-link(to="/") Home |
    router-link(to="/notes") Notes
  router-view
</template>

<script>
import Layout from '@/components/layout/LayoutComponent.vue'
export default {
  components: {
    Layout
  }
}
</script>

<style lang="scss">

</style>
