const popup = {
  state: {
    popup: {
      isOpen: false,
      type: null
    }
  },
  mutations: {
    setIsPopupOpen (state, { type, status }) {
      state.popup.type = type
      state.popup.isOpen = status
    }
  },
  actions: {
    setIsPopupOpen ({ commit }, data) {
      commit('setIsPopupOpen', data)
    }
  },
  getters: {
    getIsPopupOpen (state) {
      return state.popup
    }
  }
}

export default popup
