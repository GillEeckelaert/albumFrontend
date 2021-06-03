import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import books from './modules/books'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    books,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    paths: ['user'],
  })],
})
