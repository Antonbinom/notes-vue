<template lang="pug">
.popup
  .btn-close
    Cross
  slot(name="header")
  slot(name="main")
  slot(name="footer")

</template>

<script>
import Cross from '@/assets/cross.svg'

export default {
  components: {
    Cross
  }
}
</script>

<style lang="scss">
.popup {
  position: relative;
  max-width: 780px;
  height: auto;
  padding: 80px;
  background: rgba(var(--dark-middle-rgba), 0.7);

  border-radius: 40px;
}
.btn-close {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: var(--green-light);
  border-radius: 50%;
  cursor: pointer;

  top: 20px;
  right: 20px;
}
</style>
