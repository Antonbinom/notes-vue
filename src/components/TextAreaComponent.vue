<template lang="pug">
.input.text-small
  span.input-title {{ title }}
  .input-wrapper
    textarea.input-field.text-small(
      :value="inputValue"
      @input="handleInput"
      :maxlength="maxInputLength"
      type="text"
      :placeholder="placeholder")
  div.input-bottom(v-if="maxInputLength || !isValid")
    span.input-error(v-if="errorMessage") {{ errorMessage }}
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
    inputValue: {
      type: String
    },
    errorMessage: {
      type: String,
      default: 'Не правильно заполненные данные'
    },
    maxInputLength: {
      type: Number
    }
  },
  computed: {
    getInputLength () {
      return this.inputValue.length
    },
    isValid () {
      return !!this.errorMessage.length
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('updateInput', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &-field {
    min-height: 212px;
    padding: 16px 28px;
    resize: none;
  }
  &-bottom {
    margin-top: 0;
  }
}

@media(max-width: 1365px){
  .input {
  &-field {
    min-height: 136px;
  }
}
}
</style>
