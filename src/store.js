import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarioLogueado: {},
  },
  mutations: {
      setUsuarioLogueado (state, user) {
        // mutate state
        state.usuarioLogueado = user;
      },    
  },
  getters: {

  },
  actions: {

  }
});
