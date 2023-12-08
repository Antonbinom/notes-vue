<template lang="pug">
.container
  slot

</template>

<style lang="scss">
.container {
  width: auto;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;

  padding-left: 80px;
  padding-right: 80px;

}

@media(max-width: 991px) {
  .container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media(max-width: 767px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
