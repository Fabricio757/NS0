<template>
    <Page>
        <StackLayout>        
            <Label text="People SQLite.. 1.13 " />
            <button text="Gets" @tap="getItems()"></button>
            <button text="Insertar" @tap="insert()"></button>

            <ListView for="p in items" @itemTap="onItemTap" >
                <v-template height="50">
                    <Label :text="p.firstname" fontSize="16" horizontalAlignment="left"/>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';
const fs = require("tns-core-modules/file-system");


Vue.use(Vuex);

export default {
    data() {
        return {
            items: [],
        }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['peopleAcc']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {
      //...Vuex.mapMutations(['setUsuarioLogueado']),
      getItems: async function(){
        //   try{
        //     var res = await this.peopleAcc.get();
        //     this.items = res;    
        //   }
        //   catch(error) {
        //     alert(error.message);
        //   }
          try{
            this.peopleAcc.resetOperaciones();
            var args = [];
            args.push({'id': 1, 'type': 'INT'});
            this.peopleAcc.addOperacion("Seleccion", "People", JSON.stringify(args));
            var response = await this.peopleAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.items = response.resultados[0].R1;
              console.log(this.especie);
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }

      },
      insert: function() {
          this.peopleAcc.insert();
      },
      onItemTap: async function(){

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
    },
}
</script>