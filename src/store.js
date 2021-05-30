import Vue from 'vue';
import Vuex from 'vuex';
import AccesoRest from './js/accesoRest';
import AccesoSQLite from './js/accesoSQLite';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuarioLogueado: {},
    animalesDB: new AccesoRest("'TestDB'"),
    peopleSQLite: new AccesoSQLite("my.db"),    
  },
  mutations: {
      setUsuarioLogueado (state, user) {
        // mutate state
        state.usuarioLogueado = user;
      },    
  },
  getters: {
    animalesAcc: state => { return state.animalesDB },
    peopleAcc: state => { return state.peopleSQLite },
  },
  actions: {

  }
});
