<template>
  <Page>
    <ActionBar title="NativeScript App"></ActionBar>
    <FlexboxLayout flexDirection="column">
      <button text="Set" fontSize="16" horizontalAlignment="center" width="30%" class="secondary -rounded-lg p-y-0" @tap="SetNow"></button>
      <button text="Get" fontSize="16" horizontalAlignment="center" width="30%" class="secondary -rounded-lg p-y-0" @tap="getdate"></button>

    </FlexboxLayout>
  </Page>
</template>
<script >

import Vue from 'vue';
import Vuex from 'vuex';


const Sqlite = require("nativescript-sqlite");
const fs = require("tns-core-modules/file-system");

Vue.use(Vuex);

export default {
  components:{
    },
  data() {
    return {

    };
  },
  computed:{
      ...Vuex.mapState(['usuarioLogueado']),
      ...Vuex.mapGetters(['productsAcc']),
    },
  methods:{
    SetNow: async function(){

      if (!Sqlite.exists("products.db")) {
        console.log("No Existe");
      }else{
        console.log("Existe");
        var response = await this.productsAcc.executeQuery(this.usuarioLogueado,"SELECT * FROM products", []);
        if(response.error === "false"){              
          console.log(response.resultados[0].R1);
        }else{
          alert(response.message);  
        }
      }


        // if (!Sqlite.exists("prod2.sqlite")) {
        //   try{
        //   let appPath = fs.knownFolders.currentApp().path;
        //   console.log("appPath:" + appPath);

        //   var documents = fs.knownFolders.currentApp();
        //   console.log("documents: " + documents);
        //   documents.getEntities()
        //   .then((entities) => {
        //       // entities is array with the document's files and folders.
        //       entities.forEach((entity) => {
        //           console.log(entity.name);
        //       });
        //   }).catch((err) => {
        //       // Failed to obtain folder's contents.
        //       console.log(err.stack);
        //   });


        //   console.log("no existe products");
        //   Sqlite.copyDatabase("prod2.sqlite");
          
        //   console.log("products copiado");
        //   }
        //   catch(error){
        //     console.log(error);
        //   }
        // }else{
        //   console.log("Existe Products!");
        // }



    },
    getdate: function(){
      alert("");
    },
  },
};
</script>