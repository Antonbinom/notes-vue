<template lang="pug">
div.main
  .main-info
    h1.main-title.h1 Мои заметки
    p.main-subtitle.h3 Не забывай о важном, храни его в облаке.
  img.main-img(src="@/assets/main.png")
  Popup(
    v-if="isPopupOpen.type==='login' && !isAuth"
    @close-popup="resetPopupFields(login.name); resetPopupErrors(login.name)"
    )
    template(v-slot:header)
      h2.popup-title.h2  {{ login.title }}
    template(v-slot:main)
      Input.popup-input(
        v-for="(input, index) in login.inputs"
        :key="input.title"
        @updateInput="updateInputValue($event, index, 'login')"
        :title="input.title"
        :placeholder="input.placeholder"
        :input-value="input.value"
        :input-type="input.type"
        :error-message="input.error"
        )
    template(v-slot:footer)
      .popup-footer
        .popup-footer__login
          .popup-footer__login-left
            span.popup-footer__text.text-small {{ login.question }}
            LinkBtn.popup-footer__link(@action="openPopup(login.name, login.popupLink )")
              | {{ login.popupLinkName }}
          Btn.popup-footer__btn(@action="login.method")
            |{{ login.button }}
        .popup-footer__message.text-small(v-if="login.errorMessage")
          span {{ login.errorMessage }}

  Popup(
    v-if="isPopupOpen.type==='registration' && !isAuth"
    @close-popup="resetPopupFields(registration.name); resetPopupErrors(registration.name)")
    template(v-slot:header)
      h2.popup-title.h2 {{ registration.title }}
    template(v-slot:main)
      Input.popup-input(
        v-for="(input, index) in registration.inputs"
        :key="input.title"
        @updateInput="updateInputValue($event, index, 'registration')"
        :title="input.title"
        :placeholder="input.placeholder"
        :input-value="input.value"
        :input-type="input.type"
        :error-message="input.error"
        )
    template(v-slot:footer)
      .popup-footer
        .popup-footer__login
          .popup-footer__login-left
            span.popup-footer__text.text-small {{ registration.question }}
            LinkBtn.popup-footer__link(@action="openPopup(registration.name, registration.popupLink)")
              | {{ registration.popupLinkName }}
          Btn.popup-footer__btn(@action="toRegistration")
            |{{ registration.button }}
        .popup-footer__message.text-small(v-if="registration.errorMessage")
          span {{ registration.errorMessage }}
</template>

<script>
import LinkBtn from '@/components/LinkBtnComponent.vue'
import Btn from '@/components/BtnComponent.vue'
import Input from '@/components/InputComponent.vue'
import TextArea from '@/components/TextAreaComponent.vue'
import Popup from '@/components/PopupComponent.vue'
import { registration, login, auth } from '@/methods/userApiMethods.js'

import inputValidation from '@/methods/inputValidation.js'
export default {
  data () {
    return {
      login: {
        name: 'login',
        title: 'Вход в ваш аккаунт',
        inputs: [
          {
            title: 'Email',
            placeholder: 'Введите значение',
            type: 'text',
            value: '',
            isValid: true,
            error: ''
          },
          {
            title: 'Пароль',
            placeholder: 'Введите пароль',
            type: 'password',
            value: '',
            isValid: true,
            error: ''
          }
        ],
        question: 'У вас нет аккаунта?',
        popupLink: 'registration',
        popupLinkName: 'Зарегистрируйтесь',
        button: 'Войти',
        method: this.toLogin,
        errorMessage: ''
      },
      registration: {
        name: 'registration',
        title: 'Регистрация',
        inputs: [
          {
            title: 'Email',
            placeholder: 'Введите Email',
            type: 'text',
            value: '',
            error: ''
          },
          {
            title: 'Пароль',
            placeholder: 'Введите пароль',
            type: 'password',
            value: '',
            error: ''
          },
          {
            title: 'Пароль ещё раз',
            placeholder: 'Введите пароль',
            type: 'password',
            value: '',
            error: ''
          }
        ],
        question: 'У вас есть аккаунт?',
        popupLink: 'login',
        popupLinkName: 'Войдите',
        button: 'Зарегестрироваться',
        method: this.toRegistration,
        errorMessage: ''
      }
    }
  },
  components: {
    Popup,
    LinkBtn,
    Btn,
    Input,
    TextArea
  },
  computed: {
    isAuth () {
      return this.$store.getters.authUser.email
    },
    isPopupOpen () {
      return this.$store.getters.getIsPopupOpen
    }
  },
  methods: {
    openPopup (popup, type) {
      this.$store.dispatch('setIsPopupOpen', { status: true, type })
      this.resetPopupFields(popup)
      this.resetPopupErrors(popup)
    },
    resetPopupFields (popup) {
      this[popup].inputs.forEach(input => {
        input.value = ''
      })
    },
    resetPopupErrors (popup) {
      this[popup].inputs.forEach(input => {
        input.error = ''
      })
      this[popup].errorMessage = ''
    },
    updateInputValue (value, index, name) {
      this[name].inputs[index].value = value
    },

    async toRegistration () {
      const [email, password, secondPassword] = this.registration.inputs
      const data = {
        email: email.value,
        password: password.value,
        confirm_password: secondPassword.value
      }

      const emailError = inputValidation('email', email.value)
      const passwordError = inputValidation('password', password.value)
      const confirmError = inputValidation('confirm', secondPassword.value)
      try {
        if (emailError || passwordError || confirmError) {
          this.registration.inputs[0].error = emailError
          this.registration.inputs[1].error = passwordError
          this.registration.inputs[2].error = confirmError
          return
        }

        this.resetPopupErrors('registration')

        this.$store.dispatch('setIsLoading', true)
        await registration(data)
        this.$store.dispatch('setIsLoading', false)

        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.$router.push('/notes')
      } catch (error) {
        this.registration.errorMessage = error.response.data.message
        this.$store.dispatch('setIsLoading', false)
      }
    },
    async toLogin () {
      const [email, password] = this.login.inputs
      const data = {
        email: email.value,
        password: password.value
      }
      const emailError = inputValidation('email', email.value)
      const passwordError = inputValidation('password', password.value)
      try {
        if (emailError || passwordError) {
          this.login.inputs[0].error = emailError
          this.login.inputs[1].error = passwordError
          return
        }
        this.resetPopupErrors('login')
        this.$store.dispatch('setIsLoading', true)
        await login(data)
        this.$store.dispatch('setIsLoading', false)
        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.$router.push('/notes')
      } catch (error) {
        const errorMessage = error.response.data.message
        this.login.errorMessage = Array.isArray(errorMessage) ? errorMessage[0] : errorMessage
        this.$store.dispatch('setIsLoading', false)
      }
    }
  },
  async mounted () {
    await auth()
  }
}
</script>

<style lang="scss">
  .main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    &-info {
      display: flex;
      flex-direction: column;
      padding-block: 236px;
    }
    &-title {
      width: 448px;
      margin-bottom: 40px;
    }
    &-subtitle {
      width: 394px;
      color: var(--gray)
    }
    &-img {
      width: 60%;
      max-width: 897px;
      height: fit-content;
    }
  }

@media(max-width: 1365px){
  .main {
    &-info {
      padding-block: 106px;
      margin-right: 30px;
    }
    &-title {
      margin-bottom: 40px;
    }
    &-img {
      width: 50%;
    }
  }
}

@media(max-width: 997px){
  .main {
    flex-direction: column;
    align-items: center;
  &-info {
    text-align: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 0px;
    margin-right: 0px;
  }
  &-title {
    margin-bottom: 20px;
  }
  &-subtitle {
    width: 688px;
  }
  &-img {
    width: calc(100% - 126px)
  }
}
}
@media(max-width: 767px){
  .main {
    &-info {
      padding-top: 20px;
      padding-bottom: 0px;
      margin-right: 0px;
    }
    &-title {
      width: 320px;
      margin-bottom: 20px;
      font-size: 60px;
      line-height: 64px;
    }
    &-subtitle {
      width: auto;
      margin-bottom: 17px;
      font-size: 24px;
      line-height: 36px;
    }
    &-img {
      width: 100%
    }
  }
}
</style>
