<template lang="pug">
.user.text-small
  span.user-name {{ userName }}
  .user-avatar
    Icon(@click="isLogoutVisible = !isLogoutVisible")
  Logout.user-logout(
    v-if="isLogoutVisible"
    @action="onLogout()"
    )

</template>

<script>
import Icon from '@/assets/user.svg'
import Logout from '@/components/LogoutComponent.vue'
import { logout } from '@/methods/userApiMethods.js'

export default {
  components: {
    Logout,
    Icon
  },
  props: {
    userName: String
  },
  data () {
    return {
      isLogoutVisible: false
    }
  },
  methods: {
    onLogout () {
      this.isLogoutVisible = !this.isLogoutVisible
      logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.user {
  position: relative;
  display: flex;
  align-items: center;

  &-name {
    margin-right: 12px;
  }
  &-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;

    border-radius: 50%;
    background-color: var(--dark-middle);

    cursor: pointer;
  }
  &-logout {
    position: absolute;
    top: 78px;
    right: 0;
    z-index: 20;
  }
}
</style>
