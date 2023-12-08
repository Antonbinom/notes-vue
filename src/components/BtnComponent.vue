<template lang="pug">
button.btn.text-normal(@click="$emit('action')")
  slot
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 12px 24px;

  color: #FFFFFF;

  border: none;
  border-radius: 32px;
  background-color: #B1C909;

  cursor: pointer;
  transition: background-color ease .2s;

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
