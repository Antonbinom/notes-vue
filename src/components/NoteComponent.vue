<template lang="pug">
.note
  .note-header
    .note-header__title
      | Назавние заметки ывывывывыв
    .note-ear
      .note-ear__top
      .note-ear__bottom

  .note-body
    p.note-text {{ cutText(noteText) }}
  .note-footer
    .note-btn(@click="deleteNote()")
      Cross.note-btn__icon
      | Удалить
</template>

<script>
import Cross from '@/assets/cross.svg'

export default {
  components: {
    Cross
  },
  data () {
    return {
      noteText: 'sdfsdfsdfsdfs dfsdfsdfsdfsdfsdf sdfsdfsdfsdfsdfsdfsdfsdfsdf sdfsdfsdfsdfsd fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd fsdfsdfs dfsdfsdfsdfsdf sdfsdfsdfsdfs dfsdfsdfsdfsdfsdf sdfsdfsdfsdfsdfsdfsdfsdfsdf sdfsdfsdfsdfsd fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd fsdfsdfs dfsdfsdfsdfsdf'
    }
  },
  methods: {
    cutText () {
      return this.noteText.substring(0, 200) + '...'
    },
    deleteNote () {
      console.log('Deleted')
    }
  }
}
</script>

<style lang="scss">
.note {
  height: auto;
  display: flex;
  flex-direction: column;
  width: 320px;

  font-size: 20px;
  font-weight: 500;
  line-height: 32px;

  border-radius: 12px;
  overflow: hidden;

  &-header{
    display: flex;
    height: 72px;
  }
  &-header__title{
    width: 100%;
    padding: 20px 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    background-color: var(--green-light);

  }
  &-ear{
    position: relative;
    width: 40px;
    &__top {
      position: absolute;
      background-color: var(--green);
      border-style: solid;
      border-width: 30px 0 0 30px;
      border-radius: 0 0 0 8px;
      border-color: var(--dark) var(--green) var(--green) var(--green);
      position: absolute;
      top: 0;
      z-index: 10;
    }
    &__bottom {
      position: absolute;
      height: 60px;
      width: 100%;
      background-color: var(--green-light);
      bottom: 0;
    }
  }
  &-body{
    padding: 0 28px;
    background-color: var(--green-light);
  }
  .note-text {
    text-wrap: wrap;
    overflow-wrap: break-word;
  }
  &-footer {
    display: flex;
    padding: 20px 32px;
    background-color: var(--green-light);
  }
  &-btn {
    display: flex;
    align-items: center;
    margin-left: auto;

    cursor: pointer;

    &__icon {
      margin-right: 10px;
    }
  }
}
</style>
