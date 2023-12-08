<template lang="pug">
.logout
  .logout-tail
  button.logout-btn.text-small-bold(@click="$emit('action')") Выйти
</template>

<style lang="scss">
.logout {
  position: relative;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.60);
  &-tail {
    position: absolute;
    height: 18px;
    width: 18px;

    right: 20px;
    top: -9px;
    transform: rotateZ(45deg);
    background-color: var(--dark-middle);
    z-index: -1;
  }
  &-btn {
    padding: 40px;

    color: var(--green-light);

    border: none;
    border-radius: 12px;
    background-color: var(--dark-middle);

    cursor: pointer;
  }
}
</style>
