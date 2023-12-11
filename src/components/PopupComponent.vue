<template lang="pug">
.popup(
  v-if="isPopupOpen"
  @click="close"
  )
  .popup-wrapper
    .popup-content
      Btn(@action="close").popup-close
      slot(name="header")
      slot(name="main")
      slot(name="footer")
</template>

<script>
import Btn from '@/components/RoundBtnComponent.vue'

export default {
  components: {
    Btn
  },
  computed: {
    isPopupOpen () {
      return this.$store.getters.getIsPopupOpen.isOpen
    }
  },
  methods: {
    close ({ target }) {
      if (target.classList.contains('popup') || target.closest('.popup-close')) {
        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.$emit('close-popup')
      }
    }
  },
  mounted () {
    const clientWidthBefore = document.body.clientWidth
    document.body.style.overflow = 'hidden'
    const clientWidthAfter = document.body.clientWidth
    const scrollWidth = (clientWidthAfter - clientWidthBefore) + 'px'
    document.body.style.paddingRight = scrollWidth
  },
  destroyed () {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = ''
  }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--dark-middle-rgba), 0.7);
  z-index: 1000;

  overflow-y: scroll;
  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    max-width: 780px;
    width: auto;
    height: fit-content;
  }
  &-content {
    position: relative;
    width: 620px;
    height: auto;
    padding: 80px;
    background: var(--dark-middle);

    border-radius: 40px;
  }

  &-close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  &-title {
    margin-bottom: 40px;
  }
  &-input {
    margin-bottom: 24px;
  }
  &-footer {
    margin-top: 40px;
    &__login {
      display: flex;
      align-items: center;
      &-left {
        display: flex;
        flex-wrap: wrap;
      }
    }
    &__text {
      margin-right: 4px;
      color: var(--gray);
    }
    &__btn {
      margin-left: auto;
    }
    &__message {
      margin-top: 20px;
      padding: 8px 20px;
      color: var(--red);
      background-color: rgba(var(--red-rgba), 0.1);
      border-radius: 24px;
    }
    }
}
@media(max-width: 1365px){
  .popup-content {
    width: 482px;
    padding: 56px;
  }
}
@media(max-width: 991px){
  .popup-content {
    width: 576px;
  }
}

@media(max-width: 767px){
  .popup {
    &-wrapper {
      width: 100%;
    }
    &-content {
      width: auto;
    }
  }
}

@media(max-width: 575px){
  .popup {
    &-content {
      padding: 42px 16px;
      width: auto;
    }
    &-title {
      margin-bottom: 28px;
      margin-right: 70px;
      font-size: 32px;
      line-height: 36px;
    }
    &-input {
    margin-bottom: 16px;
    }
    &-footer {
      margin-top: 28px;
      &__login {
        flex-direction: column;

      }
      &__text, &__link {
        font-size: 14px;
        line-height: 24px;
      }
      &__btn {
        justify-content: center;
        order: -1;
        width: 100%;
        margin-bottom: 12px;
      }
    }
  }

}

</style>
