import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              //logout();
              location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}

export default new Vuex.Store({
  state: {
    usuarioLogueado: null,
  },
  mutations: {
    authenticate(state) {
      console.log('authenticate');                  
      //var lData = JSON.parse(loginData);
      var loginData = '{"username":"Fabri","password":"test"}';

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: loginData//JSON.stringify(lData)//JSON.stringify({ username, password })
      };
      console.log(loginData);
      // return fetch(`http://localhost:8082/users/authenticate`, requestOptions)
      //     .then(handleResponse)
      //     .then(user => {
      //         console.log(JSON.stringify(user));
      //         if (user.token) {
      //             state.usuarioLogueado = user;//JSON.stringify(user);
      //         }
      //         return user;
      //     });

    }
  },
  actions: {

  }
});
