<template>
    <Page>
        <ActionBar title="Hola to NativeScript-Vue! 1.1">
          <StackLayout orientation="Horizontal">
            <Image src="res://fha" width="10%" height="40" verticalAlignment="left"/>
            <Label text="Version 1.1" width="60%" fontSize="24" verticalAlignment="center" />
            <Label :text="loginText" width="30%" fontSize="14" textAlignment="right" backgroundColor="#1c6b48"/>
          </StackLayout>          
        </ActionBar>

        <StackLayout orientation="vertical">
          <Label text="Login" fontSize="24" height="70" verticalAlignment="center" v-on:tap="$navigateTo(loginPage)"/>
          <Label text="Aves" fontSize="24" height="70" verticalAlignment="center" />
          <Label text="Mamiferos" fontSize="24" height="70" verticalAlignment="center" />
        </StackLayout>

    </Page>
</template>

<script >
  import Login from '~/components/Login';
  import Vue from 'vue';
  import Vuex from 'vuex';

  Vue.use(Vuex);

  export default {
    components: {

    },
    data() {
      return {
        msg: 'Hello World dd!',
        loginPage: Login,
      }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {
    
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
