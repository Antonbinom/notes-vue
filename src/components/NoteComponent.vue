<template lang="pug">
.note.text-normal
  .note-header
    .note-header__title
      | {{ data.title }}
    .note-ear
      .note-ear__top
      .note-ear__bottom

  .note-body
    p.note-text {{ cutText(data.content) }}
  .note-footer
    .note-btn(@click="deleteNote(data.id)")
      Cross.note-btn__icon
      | Удалить
</template>

<script>
import Cross from '@/assets/cross.svg'
import { deleteOne } from '@/methods/notesApiMethods.js'
export default {
  components: {
    Cross
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    cutText (content) {
      if (content.length > 200) {
        return content.substring(0, 200) + '...'
      } else {
        return content
      }
    },
    deleteNote (id) {
      deleteOne(id)
    }
  }
}
</script>

<style lang="scss">
.note {
  height: auto;
  max-height: 480px;
  display: flex;
  flex-direction: column;
  width: 100%;

  border-radius: 12px;
  overflow: hidden;

  &-header{
    display: flex;
    height: 72px;
  }
  &-header__title{
    width: calc(100% - 40px);
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
      border-width: 40px 0 0 40px;
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
      width: 40px;
      min-width: 40px;
      background-color: var(--green-light);
      bottom: 0;
    }
  }
  &-body{
    max-height: 342px;
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
    border-radius: 0 0 12px 12px;
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
