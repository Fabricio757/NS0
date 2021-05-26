<template>
    <Page>
      <ActionBar title="Login">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
        <ActionItem>
          <StackLayout orientation="horizontal" horizontalAlignment="right">                        
            <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
            <Label :text="loginText" fontSize="14" textAlignment="right"/>        
          </StackLayout>
        </ActionItem>
      </ActionBar>
      <StackLayout>        
        <Label text="Login.. 1.47 " />
        <TextField v-model="usuario" hint="Usuario" fontSize="24" />
        <TextField v-model="clave"  hint="Password"  fontSize="24"/>
        <Button text="Login" height="70" fontSize="24" class="-primary -rounded-lg" @tap="login()"></Button>
        <StackLayout class="hr"></StackLayout>
        <ActivityIndicator :busy="busy"/>
        <StackLayout orientation="Horizontal">
          <Label text="Olvidó su clave "  fontSize="24" horizontalAlignment="left" @tap="forgotPassword()"/>
          <Label class="fa m-t-5" :text="'fa-arrow-right' | fonticon" horizontalAlignment="left" @tap="forgotPassword()"/>
        </StackLayout>
        <StackLayout orientation="Horizontal">
          <Label text="Logout "  fontSize="24" horizontalAlignment="left" @tap="logout()"/>
          <Label class="fa m-t-5" :text="'fa-arrow-right' | fonticon" horizontalAlignment="left"  @tap="logout()"/>
        </StackLayout>
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
        usuario: "Fabri",
        clave: "test",
        busy: false,
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
              this.busy = true;
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
              this.busy = false;
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
      },
      logout: function(){
        this.setUsuarioLogueado({});
        
      },   
    }
  }
</script>


<style scoped>




</style>