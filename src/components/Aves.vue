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
        <Label text="Login.. 1.50 " />
        <button text="Nuevo" fontSize="16" width="20%" horizontalAlignment="right" class="-primary -rounded-lg p-y-0" @tap="$navigateTo(avesEditPage, { props: { id: 0 }})"></button>
        <SearchBar hint="Buscar" v-model="searchPhrase" borderWidth="1" class="search" @submit="onSubmit" @clear="onSubmit" />
        <ListView for="p in items" @itemTap="onItemTap" >
          <v-template height="50">
              <Label :text="p.especie" fontSize="16" horizontalAlignment="left"/>
          </v-template>
        </ListView>
      </StackLayout>
      
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';
import AvesEdit from '~/components/AvesEdit';


Vue.use(Vuex);


  export default {

    components: {

    },
    data() {
      return {
        avesEditPage: AvesEdit,    

        items: [1,2,3],      
        serveritemslength: 0, 
        busy: false,
        searchPhrase: '',
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
            args.push({'search': this.searchPhrase, 'type': 'VARCHAR'});
            args.push({'pageNumber': 1, 'type': 'INT'});
            args.push({'itemsPerPage': 1000, 'type': 'INT'});
            args.push({'sortby': 'especie', 'type': 'VARCHAR'});
            args.push({'sortdesc': 'ASC', 'type': 'VARCHAR'});
            this.animalesAcc.addOperacion("Procedure", "getAves", JSON.stringify(args));

            var response = await this.animalesAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.items = response.resultados[0].R1;
              this.serveritemslength = response.resultados[1].R2[0].totalRows;
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }
      },
      onSubmit: async function(){
        await this.getItems();
      },
      onItemTap: function(args){
        const id = args.item.id;
        this.$navigateTo(this.avesEditPage, { props: { id: id }});
      },
    },
    mounted: async function() {
        await this.getItems();
    },
  }
</script>


<style scoped>


.search{
    border-radius: 30;
    border-width: 2px;
    background-color: burlywood;
}

</style>