<template lang="pug">
a.link-btn
  slot
</template>

<style lang="scss">
.link-btn{
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  color: var(--green-light);
  cursor: pointer;
  transition: color ease 0.2s;

  &:hover {
    color: var(--white);
    transition: color ease 0.2s;

  }
}

</style>
