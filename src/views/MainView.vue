<template lang="pug">
div.main
  Popup(v-if="isPopupOpen.type==='login' && !isAuth")
    template(v-slot:header)
      h1 {{ login.title }}
    template(v-slot:main)
      Input(
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
      .footer-login
        span.footer-text.text-small {{ login.question }}
        LinkBtn.footer-link(@action="openPopup(login.name, login.popupLink )")
          | {{ login.popupLinkName }}
        Btn.footer-btn(@action="login.method")
          |{{ login.button }}
      .footer-message.text-small(v-if="login.errorMessage")
        span {{ login.errorMessage }}

  Popup(v-if="isPopupOpen.type==='registration' && !isAuth")
    template(v-slot:header)
      h1 {{ registration.title }}
    template(v-slot:main)
      Input(
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
      .footer-login
        span.footer-text.text-small {{ registration.question }}
        LinkBtn.footer-link(@action="openPopup(registration.name, registration.popupLink)")
          | {{ registration.popupLinkName }}
        Btn.footer-btn(@action="toRegistration")
          |{{ registration.button }}
      .footer-message.text-small(v-if="registration.errorMessage")
        span {{ registration.errorMessage }}
</template>

<script>
import LinkBtn from '@/components/LinkBtnComponent.vue'
import Btn from '@/components/BtnComponent.vue'
import Input from '@/components/InputComponent.vue'
import TextArea from '@/components/TextAreaComponent.vue'
import Popup from '@/components/PopupComponent.vue'
import { registration, login, auth } from '@/methods/userApiMethods.js'

import { required, minLength } from 'vuelidate/lib/validators'
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
            error: '',
            validation: { required, minLength: minLength(4) }
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
    openPopup (popup, type) {
      this.$store.dispatch('setIsPopupOpen', { status: true, type })
      this.resetPopupFields(popup)
      this.resetPopupErrors(popup)
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

        await registration(data)

        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.$router.push('/notes')
      } catch (error) {
        this.registration.errorMessage = error.response.data.message
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

        await login(data)

        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.$router.push('/notes')
      } catch (error) {
        this.login.errorMessage = error.response.data.message
      }
    },
    updateInputValue (value, index, name) {
      this[name].inputs[index].value = value
    }
  },
  mounted () {
    auth()
  }
}
</script>
