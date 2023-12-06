<template lang="pug">
div.layout
  Header
  LinkBtn
    | sdsdsd
  Input(
    title="Это инпут"
    placeholder="Введите значение"
    error-message="Error"
    input-type="password"
    )
  TextArea
  Note
  Popup
    template(v-slot:header)
      h1 {{ login.title }}
    template(v-slot:main)
      Input(
        v-for="input in login.inputs"
        :key="input.title"
        :title="input.title"
        :placeholder="input.placeholder"
        :input-type="input.type"
        :error-message="input.error"
        )
    template(v-slot:footer)
      .footer-login
        span.footer-text У вас нет аккаунта?
        LinkBtn.footer-link
          | Зарегистрируйтесь
        Btn.footer-btn
          |Войти
      .footer-message
        span Пользователь с таким логином не найден

  Popup
    template(v-slot:header)
      h1 {{ registration.title }}
    template(v-slot:main)
      Input(
        v-for="input in registration.inputs"
        :key="input.title"
        :title="input.title"
        :placeholder="input.placeholder"
        :input-type="input.type"
        :error-message="input.error"
        )
    template(v-slot:footer)
      .footer-login
        span.footer-text У вас есть аккаунт?
        LinkBtn.footer-link
          | Войдите
        Btn.footer-btn
          |Зарегестрироваться
      .footer-message
        span Пользователь с таким e-mail уже зарегистрирован

  Popup
    template(v-slot:header)
      h1 {{ registration.title }}
    template(v-slot:main)
      Input(
        :title="note.inputs[0].title"
        :placeholder="note.inputs[0].placeholder"
        :input-type="note.inputs[0].type"
        :error-message="note.inputs[0].error"
        :max-input-length="note.inputs[0].length"
        )
      TextArea(
      :title="note.inputs[1].title"
      :placeholder="note.inputs[1].placeholder"
      :input-type="note.inputs[1].type"
      :error-message="note.inputs[1].error"
      :max-input-length="note.inputs[1].length"

      )
    template(v-slot:footer)
      .footer-login
        Btn.footer-btn
          |Добавить
      .footer-message
        span Требуется авторизация
</template>

<script>
import Header from '@/components/HeaderComponent.vue'
import LinkBtn from '@/components/LinkBtnComponent.vue'
import Btn from '@/components/BtnComponent.vue'
import Input from '@/components/InputComponent.vue'
import TextArea from '@/components/TextAreaComponent.vue'
import Note from '@/components/NoteComponent.vue'
import Popup from '@/components/PopupComponent.vue'

export default {
  data () {
    return {
      login: {
        title: 'Вход в ваш аккаунт',
        inputs: [
          {
            title: 'Email',
            placeholder: 'Ввудите значение',
            type: 'text',
            error: 'Error'
          },
          {
            title: 'Пароль',
            placeholder: 'Ввудите пароль',
            type: 'password',
            error: 'Error'
          }
        ]
      },
      registration: {
        title: 'Регистрация',
        inputs: [
          {
            title: 'Email',
            placeholder: 'Введите Email',
            type: 'text',
            error: 'Error'
          },
          {
            title: 'Пароль',
            placeholder: 'Введите пароль',
            type: 'password',
            error: 'Error'
          },
          {
            title: 'Пароль ещё раз',
            placeholder: 'Введите пароль',
            type: 'password',
            error: 'Error'
          }
        ]
      },
      note: {
        title: 'Добавление заметки',
        inputs: [
          {
            title: 'Название заметки',
            placeholder: 'Введите название',
            type: 'text',
            error: 'Error',
            length: 100
          },
          {
            title: 'Текст заметки',
            placeholder: 'Введите текст',
            type: 'text',
            error: 'Error',
            length: 500
          }
        ]
      }
    }
  },
  components: {
    Header,
    LinkBtn,
    Btn,
    Input,
    TextArea,
    Note,
    Popup
  }
}
</script>

<style lang="scss">
.layout {
  padding: 43px 160px;
}
.footer {
  &-login {
    display: flex;
    align-items: center;
  }
  &-text {
    margin-right: 4px;

    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    color: var(--gray);
  }
  &-btn {
    margin-left: auto;
  }
  &-message {
    margin-top: 20px;
    padding: 8px 20px;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    color: var(--red);
    background-color: rgba(var(--red-rgba), 0.1);
    border-radius: 24px;
  }
  }

</style>
