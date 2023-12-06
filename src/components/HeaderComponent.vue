<template lang="pug">
.header
  router-link(to="/")
    Logo.header-logo
  BtnComponent.header-btn(v-if="!isAuth")
    Login.header-btn__icon(@click="")
    | Войти
  User.header-user(v-if="isAuth")
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
  data () {
    return {
      isAuth: false
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;

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
