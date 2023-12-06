<template lang="pug">
.user
  span.user-name protest_the_hero@mail.ru
  .user-avatar
    Icon(@click="isLogoutVisible = !isLogoutVisible")
  Logout.user-logout(
    v-if="isLogoutVisible"
    @logout="logout()"
    )

</template>

<script>
import Icon from '@/assets/user.svg'
import Logout from '@/components/LogoutComponent.vue'

export default {
  components: {
    Logout,
    Icon
  },
  data () {
    return {
      isLogoutVisible: false
    }
  },
  methods: {
    logout () {
      this.isLogoutVisible = !this.isLogoutVisible
    }
  }
}
</script>

<style lang="scss">
.user {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
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
    z-index: 10;
  }
}
</style>
