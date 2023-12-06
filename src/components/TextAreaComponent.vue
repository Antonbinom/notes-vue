<template lang="pug">
.input
  span.input-title {{ title }}
  .input-wrapper
    textarea.input-field(
      v-model="value"
      :maxlength="maxInputLength"
      type="text"
      :placeholder="placeholder")
  div.input-bottom(v-if="maxInputLength || !isValid")
    span.input-error(v-if="!isValid") {{ errorMessage }}
    span.input-counter {{getInputLength}}/{{ maxInputLength }}
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Введите значение'
    },
    placeholder: {
      type: String,
      default: 'Введите значение'
    },
    errorMessage: {
      type: String,
      default: 'Не правильно заполненные данные'
    },
    inputType: {
      type: String,
      default: 'text'
    },
    maxInputLength: {
      type: Number
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    getInputLength () {
      return this.value.length
    },
    isValid () {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &-field {
    min-height: 260px;
    padding: 16px 28px;
    resize: none;
  }
  &-bottom {
    margin-top: 0;
  }
}
</style>
