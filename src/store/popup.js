const popup = {
  state: {
    isLoading: false,
    popup: {
      isOpen: false,
      type: null
    }
  },
  mutations: {
    setIsPopupOpen (state, { type, status }) {
      state.popup.type = type
      state.popup.isOpen = status
    },
    setIsLoading (state, value) {
      state.isLoading = value
    }

  },
  actions: {
    setIsPopupOpen ({ commit }, data) {
      commit('setIsPopupOpen', data)
    },
    setIsLoading ({ commit }, value) {
      commit('setIsLoading', value)
    }
  },
  getters: {
    getIsPopupOpen (state) {
      return state.popup
    },
    getIsLoading (state) {
      return state.isLoading
    }
  }
}

export default popup
