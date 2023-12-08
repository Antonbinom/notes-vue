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
  position: absolute;
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
  background-color: #97AB0D;
  transition: background-color ease .2s;
  }

  &:active {
    background-color: #819400;
    transition: background-color ease .2s;
  }

  &:disabled {
    background-color: #9DA5AF;
    cursor:not-allowed;
  }
}
</style>
