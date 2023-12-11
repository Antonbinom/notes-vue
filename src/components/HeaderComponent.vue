<template lang="pug">
.header
  Logo.header-logo
  LogoMob.header-logo--mob
  BtnComponent.header-btn( v-if="!isAuth" @action="openPopup('login')")
    Login.header-btn__icon
    | Вход
  User.header-user(v-if="isAuth" :user-name="isAuth")
</template>

<script>
import Logo from '@/assets/logo.svg'
import LogoMob from '@/assets/logo-mob.svg'

import Login from '@/assets/login.svg'

import BtnComponent from '@/components/BtnComponent.vue'
import User from '@/components/UserComponent.vue'

export default {
  name: 'HeaderComponent',
  components: {
    Logo,
    Login,
    BtnComponent,
    User,
    LogoMob
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
  align-items: center;
  max-width: 1600px;
  width: 100%;
  padding-block: 40px;
  z-index: 100;
  background-color: var(--dark);

  &-logo {
    width:219px;
    height: 50px;
    color: #B1C909;

    &--mob {
      display: none;
    }
  }
  &-btn__icon {
    margin-right: 12px
  }
  &-user {
    position: relative;
  }
}

@media(max-width: 1365px) {
  .header {
    padding-block: 20px;
  }
}
@media(max-width: 767px) {
  .header-logo {
    width: 154px;
    height: 36px;
  }
}
@media(max-width: 575px) {
  .header-logo {
    display: none;

    &--mob {
      display: block;
      margin-right: 20px;
    }
  }
}
</style>
