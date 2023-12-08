<template lang="pug">
.popup(
  v-if="isPopupOpen"
  @click="close"
  )
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
      }
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  &-content {
    position: relative;
    max-width: 780px;
    width: 100%;
    height: auto;
    padding: 80px;
    background: var(--dark-middle);

    border-radius: 40px;
  }

  &-close {
    top: 20px;
    right: 20px;
  }
}

.footer {
  &-login {
    display: flex;
    align-items: center;
  }
  &-text {
    margin-right: 4px;
    color: var(--gray);
  }
  &-btn {
    margin-left: auto;
  }
  &-message {
    margin-top: 20px;
    padding: 8px 20px;
    color: var(--red);
    background-color: rgba(var(--red-rgba), 0.1);
    border-radius: 24px;
  }
  }
</style>
