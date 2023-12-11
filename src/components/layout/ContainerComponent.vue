<template lang="pug">
.container
  slot

</template>

<style lang="scss">
.container {
  width: auto;
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: 80px;
}

@media(max-width: 991px) {
  .container {
      padding-inline: 40px;

  }
}

@media(max-width: 767px) {
  .container {
      padding-inline: 20px;
  }
}
</style>
