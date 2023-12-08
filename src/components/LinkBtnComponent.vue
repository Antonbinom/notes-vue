<template lang="pug">
a.link-btn.text-small-bold(@click.prevent="$emit('action')")
  slot
</template>

<style lang="scss">
.link-btn{
  color: var(--green-light);
  cursor: pointer;
  transition: color ease 0.2s;

  &:hover {
    color: var(--white);
    transition: color ease 0.2s;

  }
}

</style>
