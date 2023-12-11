<template lang="pug">
button.round-btn(@click="$emit('action')")
  Cross
</template>

<script>
import Cross from '@/assets/cross.svg'

export default {
  components: {
    Cross
  }
}
</script>

<style lang="scss" scoped>
.round-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: var(--green-light);
  border: none;
  color: var(--white);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
  background-color: var(--green-middle);
  transition: background-color ease .2s;
  }

  &:active {
    background-color: var(--green-dark);
    transition: background-color ease .2s;
  }

  &:disabled {
    background-color: var(--gray);
    cursor:not-allowed;
  }
}
</style>
