<template lang="pug">
.header
  Logo.header-logo
  BtnComponent.header-btn( v-if="!isAuth" @action="openPopup('login')")
    Login.header-btn__icon
    | Войти
  User.header-user(v-if="isAuth" :user-name="isAuth")
</template>

<script>
import Logo from '@/assets/logo.svg'
import Login from '@/assets/login.svg'

import BtnComponent from '@/components/BtnComponent.vue'
import User from '@/components/UserComponent.vue'

export default {
  name: 'HeaderComponent',
  components: {
    Logo,
    Login,
    BtnComponent,
    User
  },
  computed: {
    isAuth () {
      return this.$store.getters.authUser.email
    }
  },
  methods: {
    openPopup (type) {
      this.$store.dispatch('setIsPopupOpen', { type, status: true })
    }
  }
}
</script>

<style lang="scss">
.header {
  position: sticky;
  display: flex;
  justify-content: space-between;
  max-width: 1600px;
  width: 100%;
  padding: 40px 0;
  z-index: 100;
  background-color: var(--dark);

  &-logo {
    color: #B1C909;
  }
  &-btn__icon {
    margin-right: 12px
  }
  &-user {
    position: relative;
  }
}

</style>
