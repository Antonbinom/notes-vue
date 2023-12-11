<template lang="pug">
.user.text-small
  span.user-name {{ userName }}
  .user-avatar(@click="isLogoutVisible = !isLogoutVisible")
    Icon.user-avatar__icon
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
    },
    handleOutsideClick (e) {
      if (this.isLogoutVisible && !e.target.classList.contains('logout-btn') && !e.target.closest('.user-avatar')) {
        this.isLogoutVisible = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleOutsideClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleOutsideClick)
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
    max-width: 215px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

    &__icon {
      width: 22px;
      height: 28px;
    }
  }
  &-logout {
    position: absolute;
    top: 78px;
    right: 0;
    z-index: 20;
  }
}

@media(max-width: 767px) {
  .user-avatar {
    width: 36px;
    height: 36px;
  &__icon {
    width: 13px;
    height: 18px;
  }
}
}
</style>
