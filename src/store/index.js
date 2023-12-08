import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth.js'
import popup from '@/store/popup.js'
import notes from '@/store/notes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    popup,
    notes
  }
})
