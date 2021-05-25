<template>
    <Page>
      <ActionBar title="Aves">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
        <ActionItem>
          <StackLayout orientation="horizontal" horizontalAlignment="right">                        
            <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
            <Label :text="loginText" fontSize="14" textAlignment="right"/>        
          </StackLayout>
        </ActionItem>
      </ActionBar>
      <StackLayout>        
        <Label text="Login.. 1.48 " />
          <ListView for="p in items" class="list-group">
            <v-template>
                <StackLayout class="list-group-item">
                    <Label :text="p.especie" />
                </StackLayout>
            </v-template>
          </ListView>
      </StackLayout>
      
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


  export default {

    components: {

    },
    data() {
      return {
        items: [],      
        serveritemslength: 0, 
        busy: false,
      }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['animalesAcc']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {
      ...Vuex.mapMutations(['setUsuarioLogueado']),
      getItems: async function(){
          try{
            this.animalesAcc.resetOperaciones();
            var args = [];
            args.push({'search': '', 'type': 'VARCHAR'});
            args.push({'pageNumber': 1, 'type': 'INT'});
            args.push({'itemsPerPage': 1000, 'type': 'INT'});
            args.push({'sortby': 'id', 'type': 'VARCHAR'});
            args.push({'sortdesc': 'ASC', 'type': 'VARCHAR'});
            this.animalesAcc.addOperacion("Procedure", "getAves", JSON.stringify(args));

            var response = await this.animalesAcc.execute(this.usuarioLogueado, "http://192.168.0.6:8082/");
            if(response.error === "false"){
              this.items = response.resultados[0].R1;
              this.serveritemslength = response.resultados[1].R2[0].totalRows;
            }
          }
          catch(error) {
            alert(error.message);
          }
      },
    },
    mounted: function() {
        await this.getItems();
        console.log('Items: ');
        console.log(this.items);
    },
  }
</script>


<style scoped>




</style>