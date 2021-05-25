import Vue from 'vue';
import Vuex from 'vuex';
import AccesoDB from './js/accesoDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarioLogueado: {},
    animalesDB: new AccesoDB("'TestDB'"),
  },
  mutations: {
      setUsuarioLogueado (state, user) {
        // mutate state
        state.usuarioLogueado = user;
      },    
  },
  getters: {
    animalesAcc: state => { return state.animalesDB },
  },
  actions: {

  }
});
