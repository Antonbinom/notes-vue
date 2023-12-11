<template lang="pug">
.input.text-small
  span.input-title {{ title}}
  .input-wrapper
    input.input-field.text-small(
      :value="inputValue"
      @input="handleInput"
      :maxlength="maxInputLength"
      :type="getInputType"
      :placeholder="placeholder"
      )
    EyeOn(@click="toggleShowPassword(true)").input-icon.eye-on(v-if="inputType==='password' && !isVisible")
    EyeOff(@click="toggleShowPassword(false)").input-icon.eye-off(v-if="inputType==='password' && isVisible")
  div.input-bottom(v-if="maxInputLength || errorMessage")
    span.input-error(v-if="errorMessage") {{ errorMessage }}
    span.input-counter(v-if="maxInputLength") {{getInputLength}}/{{ maxInputLength }}
</template>

<script>
import EyeOn from '@/assets/eye-on.svg'
import EyeOff from '@/assets/eye-off.svg'

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
    inputType: {
      type: String,
      default: 'text'
    },
    maxInputLength: {
      type: Number
    }
  },
  components: {
    EyeOn,
    EyeOff
  },
  data () {
    return {
      isVisible: false
    }
  },
  computed: {
    getInputType () {
      return this.inputType === 'password'
        ? this.isVisible ? 'text' : 'password'
        : 'text'
    },
    getInputLength () {
      return this.inputValue.length
    }
  },
  methods: {
    toggleShowPassword (value) {
      this.isVisible = value
    },
    handleInput (event) {
      this.$emit('updateInput', event.target.value)
    }
  }
}
</script>

<style lang="scss">
.input {
  display: flex;
  flex-direction: column;
  width: inherit;

  &-title {
    margin-bottom: 8px;
    padding-inline: 24px;
    color: var(--gray);
  }
  &-wrapper {
    position: relative;
    width: 100%;
  }
  &-field {
    max-height: 72px;
    max-width: 100%;
    width: fill-available;
    width: -webkit-fill-available;
    width: -moz-available;;
    padding: 22px 28px;
    color: var(--dark);

    font-family: 'Montserrat' sans-serif;

    border: 2px solid transparent;
    border-radius: 36px;
    overflow: hidden;
    outline: none;

    transition: border-color ease 0.2s;

    &::placeholder {
      color: var(--gray);
    }
    &:hover, &:focus {
      border-color: var(--green-light);
      transition: border-color ease 0.2s;
    }
  }
  &-icon {
    position: absolute;
    top: 50%;
    color: var(--green-light);
    transform: translateY(-50%);

    &.eye-on{
      right: 28px;
    }
    &.eye-off{
      right: 40px;
    }
  }
  &-bottom {
    display: flex;
    justify-content: space-between;
    padding-inline: 24px;
    margin-top: 8px;

  }
  &-error {
    color: var(--red);
  }
  &-counter {
    margin-left: auto;
    color: var(--gray)
  }
}
</style>
