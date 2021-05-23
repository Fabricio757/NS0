<template>
    <Page>
      <ActionBar title="Login">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
        <StackLayout orientation="horizontal">                        
            <Label class="fa fa-regular" :text="'fa-login' | fonticon" />
            <Label :text="loginText" width="50%" fontSize="14" textAlignment="right"/>        
        </StackLayout>
      </ActionBar>
      <StackLayout>        
        <Label text="Login.. 1.45 " />
        <TextField v-model="usuario" hint="Usuario" />
        <TextField v-model="clave"  hint="Password" />
        <Button text="Login"  backgroundColor="#43b883" @tap="login()"></Button>
        <Label text="Olvidó su clave"  @tap="forgotPassword()" />
        
        <Label class="fa" :text="'fa-anchor' | fonticon" />
      </StackLayout>
    </Page>
</template>
s
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
        usuario: "",
        clave: "test",
        //loginText: "l o g i n",
      }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {
      ...Vuex.mapMutations(['setUsuarioLogueado']),
      login: async function(){
          try{
              let requestAxiosOptions = {
                  username: this.usuario,
                  password: this.clave
              };
              console.log("requestAxiosOptions: " + requestAxiosOptions);
              const res = await axios.post("http://192.168.0.6:8082/users/authenticate", requestAxiosOptions)
              var user = res.data;
              console.log(user);                        
              alert(user.firstName);
              this.setUsuarioLogueado(user);
          }
          catch (error) {
              alert(error);
          }
      }, 
      forgotPassword: function(){
        confirm({
          title: "Recuperar Clave",
          message: "Se le reenviará su Clave al mail ingresado",
          okButtonText: "OK",
          cancelButtonText: "Cancel"
        }).then(result => {
          console.log(result);
        });
      }     
    }
  }
</script>


<style scoped>




</style>