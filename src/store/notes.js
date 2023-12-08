const notes = {
  state: {
    notes: []
  },
  mutations: {
    setNotes (state, data) {
      state.notes = data
    },
    setNewNote (state, data) {
      state.notes = [data, ...state.notes]
    },
    deleteNote (state, id) {
      state.notes = state.notes.filter(note => note.id !== id)
    }
  },
  actions: {
    setNotes ({ commit }, data) {
      commit('setNotes', data)
    },
    setNewNote ({ commit }, data) {
      commit('setNewNote', data)
    },
    deleteNote ({ commit }, id) {
      commit('deleteNote', id)
    }
  },
  getters: {
    getNotes (state) {
      return state.notes.reverse()
    }
  }
}

export default notes
