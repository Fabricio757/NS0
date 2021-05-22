<template>
    <Page>
      <ActionBar title="Login">
            <Image src="res://icon" width="40" height="40" verticalAlignment="center" v-on:tap="$navigateBack"/>
      </ActionBar>
      <StackLayout>        
        <Label text="Login.. 1.30 " />
        <TextField v-model="usuario" row="1" col="0" backgroundColor="#43b883" />
        <TextField v-model="password"  backgroundColor="#43b883" />
        <Button text="Login"  backgroundColor="#43b883" @tap="login"></Button>
      </StackLayout>
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';
//import * as http from "http";
import axios from "axios";

Vue.use(Vuex);


  export default {

    components: {

    },
    data() {
      return {
        usuario: 'usuario',
        password: 'password'
      }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado'])
    },
    methods: {
        ...Vuex.mapMutations(['authenticate']),
        login: async function(username, password){
            
          var loginData = '{"username":"Fabri","password":"test"}';

          this.usuario = 'Fabricio';

          console.log(loginData);
          let requestAxiosOptions = {
              username: 'Fabri',
              password: 'test'
          };

          try{
          let response = await axios.post("http://192.168.0.6:8082/users/authenticate", requestAxiosOptions)
          console.log("Response: ----------------");
          console.log(response);
          } 
          catch (error) {
            console.log("error: ------------------");
            console.log(error);
          }
        }    
    }
  }
</script>


