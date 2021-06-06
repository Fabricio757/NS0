<template>
    <Page>
        <ActionBar title="Products">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateTo(appPage)"></NavigationButton>
            <ActionItem>
            <StackLayout orientation="horizontal" horizontalAlignment="right">                        
                <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
                <Label :text="loginText" fontSize="14" textAlignment="right"/>        
            </StackLayout>
            </ActionItem>
        </ActionBar>
        <StackLayout>        
            <Label text="Products SQLite.. 1.21 " />
            <!-- <button text="Nuevo" fontSize="16" width="20%" horizontalAlignment="right" class="-primary -rounded-lg p-y-0" @tap="$navigateTo(productsEditPage, { props: { id: 0 }})"></button> -->
            
            
            
            
            <MySearchBar height="50" horizontalAlignment="left" @searched="searchItems">
                <TextField v-model="searchNombre" hint="Nombre"/>
                <TextField v-model="searchApellido" hint="Apellido"/>
            </MySearchBar>



            <ListView for="p in items" @itemTap="onItemTap" >
                <v-template height="50">
                    <StackLayout>
                        <StackLayout orientation="Horizontal">
                            <Label :text="p.Descripcion"  fontSize="16" horizontalAlignment="left"/>
                            <Label :text="p.Codigo"  fontSize="16" horizontalAlignment="left"/>
                        </StackLayout>                    
                        <Label :text="utils.dateToDMY(p.birthday)" fontSize="12" horizontalAlignment="left"/>
                    </StackLayout>                    
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';

import Utils from '~/js/Utils';
import App from '~/components/App';
//import ProductsEdit from '~/components/ProductsEdit';
import MySearchBar from '~/components/mycomponents/MySearchBar';


Vue.use(Vuex);

export default {
    components: {
        MySearchBar,
    },
    data() {
        return {
            utils: new Utils(),
            //productsEditPage: ProductsEdit, 
            appPage: App,
            items: [],

            //searchPhrase: '',
            searchNombre: '',
            searchApellido: '',
        }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['productsAcc']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {
      getItems: async function(){
          try{
            this.productsAcc.resetOperaciones();
            var args = [];
            this.productsAcc.addOperacion("Seleccion", "Products", JSON.stringify(args));
            var response = await this.productsAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.items = response.resultados[0].R1;
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }

      },
      searchItems: async function(){
          try{
            this.productsAcc.resetOperaciones();
            var args = [];
            if(this.searchNombre != ''){
                args.push({ 'firstname' : this.searchNombre, 'type':'VARCHAR'});
            }
            if(this.searchApellido){
                args.push({ 'lastname' : this.searchApellido, 'type':'VARCHAR'});
            }
            this.productsAcc.addOperacion("Seleccion", "Products", JSON.stringify(args));
            var response = await this.productsAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.items = response.resultados[0].R1;
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }

      },
      insert: function() {
          this.productsAcc.insert();
      },
      onSubmit: async function(){
        await this.getItems();
      },
      onItemTap: function(args){
        const id = args.item.id;
        //this.$navigateTo(this.productsEditPage, { props: { id: id }});
      },
      showFiles: function() {
          
            var array = [];
            
            var documents = fs.knownFolders.documents();
            console.log(documents);
            documents.getEntities()
                .then((entities) => {
                    // entities is array with the document's files and folders.
                    entities.forEach((entity) => {
                        array.push(
                            {
                                nivel: 1,
                                name: entity.name,
                                path: entity.path,
                                lastModified: entity.lastModified.toString(),
                            }
                        );
                    });
                    console.log(array);
                }).catch((err) => {
                    // Failed to obtain folder's contents.
                    console.log(err.stack);
                });


      },
      dateToString: function(value){
            // var d = new Date(value);
            // var r = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
            var r = this.utils.dateToDMY(value);
            return r;
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