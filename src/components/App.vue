<template>
    <Page class="ns-dark">
        <ActionBar title="CRUD1.0 ns">
          <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"  @tap="$navigateBack"></NavigationButton>
          <StackLayout orientation="horizontal" horizontalAlignment="right">                        
            <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
            <Label :text="loginText" fontSize="14" textAlignment="right"/>        
          </StackLayout>
        </ActionBar> 

        <StackLayout orientation="vertical">
          <Label text="Login" fontSize="24" height="70" verticalAlignment="center" v-on:tap="$navigateTo(loginPage)"/>
          <Label text="Aves" fontSize="24" height="70" verticalAlignment="center" v-on:tap="$navigateTo(avesPage)"/>
          <Label text="Mamiferos" fontSize="24" height="70" verticalAlignment="center" v-on:tap="$navigateTo(animalesPage)"/>
          <Label text="People SQLite" fontSize="24" height="70" verticalAlignment="center" v-on:tap="$navigateTo(peoplePage)"/>
        </StackLayout>

    </Page>
</template>

<script >
  import Login from '~/components/Login';
  import Aves from '~/components/Aves';
  import Animales from '~/components/Animales';
  import People from '~/components/People';
  import Vue from 'vue';
  import Vuex from 'vuex';
  import Theme from '@nativescript/theme'

  Vue.use(Vuex);
  Theme.setMode(Theme.Dark);

  export default {
    components: {

    },
    data() {
      return {
        msg: 'Hello World dd!',
        loginPage: Login,
        avesPage: Aves,
        animalesPage: Animales,
        peoplePage: People,
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
