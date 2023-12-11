<template lang="pug">
.notes
  Note(
    v-for="(note, index) in getNotes"
    :key="note.id"
    :data="note"
    )

  AddBtn.notes-add(@action="openPopup()")
  Popup(
    v-if="$store.getters.getIsPopupOpen.type==='note'"
    @close-popup="resetPopupFields(note.name); resetPopupErrors(note.name)"
    )
    template(v-slot:header)
      h2.popup-title.h2 {{ note.title }}
    template(v-slot:main)
      Input.popup-input(
        @updateInput="updateInputValue($event, 0, 'note')"
        :title="note.inputs[0].title"
        :placeholder="note.inputs[0].placeholder"
        :input-value="note.inputs[0].value"
        :input-type="note.inputs[0].type"
        :error-message="note.inputs[0].error"
        :max-input-length="note.inputs[0].length"
        )
      TextArea(
      @updateInput="updateInputValue($event, 1, 'note')"
      :title="note.inputs[1].title"
      :placeholder="note.inputs[1].placeholder"
      :input-value="note.inputs[1].value"
      :input-type="note.inputs[1].type"
      :error-message="note.inputs[1].error"
      :max-input-length="note.inputs[1].length"

      )
    template(v-slot:footer)
      .popup-footer
        .popup-footer__login
          Btn(@action="addNote()").popup-footer__btn
            |Добавить
        .popup-footer__message(v-if="note.errorMessage")
          span {{note.errorMessage}}
</template>

<script>
import Container from '@/components/layout/ContainerComponent.vue'
import Note from '@/components/NoteComponent.vue'
import AddBtn from '@/components/RoundBtnComponent.vue'
import Btn from '@/components/BtnComponent.vue'
import Popup from '@/components/PopupComponent.vue'
import Input from '@/components/InputComponent.vue'
import TextArea from '@/components/TextAreaComponent.vue'
import { getAll, addNew } from '@/methods/notesApiMethods.js'
import inputValidation from '@/methods/inputValidation.js'

export default {
  components: {
    Container,
    Note,
    AddBtn,
    Btn,
    Popup,
    Input,
    TextArea
  },
  data () {
    return {
      note: {
        title: 'Добавление заметки',
        inputs: [
          {
            name: 'title',
            title: 'Название заметки',
            placeholder: 'Введите название',
            type: 'text',
            length: 64,
            value: '',
            error: ''
          },
          {
            name: 'content',
            title: 'Текст заметки',
            placeholder: 'Введите текст',
            type: 'text',
            length: 250,
            value: '',
            error: ''
          }
        ],
        errorMessage: ''
      }
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters.authUser.email
    },
    getNotes () {
      return this.$store.getters.getNotes
    }
  },
  methods: {
    openPopup () {
      this.$store.dispatch('setIsPopupOpen', { status: true, type: 'note' })
      this.resetPopupFields('note')
      this.resetPopupErrors('note')
    },
    resetPopupFields (popup) {
      this[popup].inputs.forEach(input => {
        input.value = ''
      })
    },
    resetPopupErrors (popup) {
      this[popup].inputs.forEach(input => {
        input.error = ''
      })
      this[popup].errorMessage = ''
    },
    updateInputValue (value, index, name) {
      this[name].inputs[index].value = value
    },

    async addNote () {
      const [title, content] = this.note.inputs

      const note = { title: title.value, content: content.value }

      const titleError = inputValidation('title', title.value)
      const contentError = inputValidation('content', content.value)

      try {
        if (titleError || contentError) {
          this.note.inputs[0].error = titleError
          this.note.inputs[1].error = contentError
          return
        }

        this.resetPopupErrors('note')
        this.$store.dispatch('setIsLoading', true)
        await addNew(note)
        this.$store.dispatch('setIsLoading', false)

        this.$store.dispatch('setIsPopupOpen', { status: false, type: null })
        this.updateInputValue('', 0, 'note')
        this.updateInputValue('', 1, 'note')
      } catch (error) {
        const errors = error.response.data.message
        this.note.errorMessage = errors
        this.$store.dispatch('setIsLoading', false)
      }
    }
  },
  async mounted () {
    await getAll()
  }
}
</script>

<style lang="scss">
.notes {
  overflow-y: auto;
  max-height: calc(100vh - 240px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  gap: 40px;
  padding-top: 40px;

  scrollbar-width: none;

  &-add {
    position: fixed;
    bottom: 40px;
    right: 12px;
    transform: rotateZ(45deg);
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.60);
    z-index: 100;

  }
  &::-webkit-scrollbar {
    display: none;
  }
}

@media (max-width: 1367px) {
  .notes {
  gap: 20px;
  }
}

@media (max-width: 769px) {
  .notes {
  display: flex;
  }
}

</style>
