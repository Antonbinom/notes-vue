const auth = {
  state: {
    authUser: {}
  },
  mutations: {
    setAuthUser (state, payload) {
      state.authUser = payload
    }
  },
  actions: {
    setAuthUser ({ commit }, data) {
      commit('setAuthUser', data)
    }
  },
  getters: {
    authUser (state) {
      return state.authUser
    }
  }
}

export default auth
