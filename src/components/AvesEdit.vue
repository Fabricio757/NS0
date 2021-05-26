<template>
    <Page>
      <ActionBar title="Aves Edit">
        <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
        <ActionItem>
          <StackLayout orientation="horizontal" horizontalAlignment="right">                        
            <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
            <Label :text="loginText" fontSize="14" textAlignment="right"/>        
          </StackLayout>
        </ActionItem>
      </ActionBar>

      <StackLayout class="hr" height="70"></StackLayout>

      <StackLayout>        
        <Label text="Aves Edit.. 1.05 " />
        <StackLayout>
          <Label :text="this.esNuevo" class="text-primary h2" textAlignment="left" />
          <Button text="Borrar" fontSize="16" horizontalAlignment="right" class="secondary -rounded-lg p-y-0" @tap="borrar()"></Button>
        </StackLayout>
        <!-- <Label :text="id" fontSize="14" textAlignment="right"/> -->
        <TextField v-model="especie" height="70" hint="Especie" fontSize="24" />
        <StackLayout orientation="horizontal" horizontalAlignment="center">
            <Button text="Aceptar" fontSize="16" horizontalAlignment="center" class="-primary -rounded-lg p-y-0" @tap="aceptar()"></Button>
            <Button text="Cancelar" fontSize="16" horizontalAlignment="center" class="-primary -rounded-lg p-y-0" @tap="$navigateBack"></Button>
        </StackLayout>
      </StackLayout>

    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';
import Aves from '~/components/Aves';

Vue.use(Vuex);


  export default {

    components: {

    },
    props: ['id'],
    data() {
      return {
        //id: 0,
        especie: '',
        avesPage: Aves,
      }
    },        
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['animalesAcc']),
        loginText() {return this.usuarioLogueado.firstName },
        esNuevo() { return (this.id === 0 ? "Nuevo" : "Edición")},
    },
    methods: {
      aceptar: async function(){
        await this.save();
        this.$navigateBack;
      },
      getItem: async function(){
          try{
            this.animalesAcc.resetOperaciones();
            var args = [];
            args.push({'id': this.id, 'type': 'INT'});
            this.animalesAcc.addOperacion("Seleccion", "Aves", JSON.stringify(args));
            var response = await this.animalesAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.especie = await response.resultados[0].R1[0].especie;
              console.log(this.especie);
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }
      },
      save: async function () {
        var response = '';
        var args = [];
        try{
          if (this.esNuevo === "Edición") {
            this.animalesAcc.resetOperaciones();
            args.push({'id': this.id, 'key': 'INT'});
            args.push({ 'especie' : this.especie, 'type':'VARCHAR'});
            this.animalesAcc.addOperacion("Update", "Aves", JSON.stringify(args));
            response = await this.animalesAcc.execute(this.usuarioLogueado);

          } else {
            this.animalesAcc.resetOperaciones();
            args.push({ 'especie' : this.especie, 'type':'VARCHAR'});
            this.animalesAcc.addOperacion("Procedure", "Aves_Insert", JSON.stringify(args));
            response = await this.animalesAcc.execute(this.usuarioLogueado);  
            // if(response.error == "false")
            //   this.id = parseInt(response.resultados[0]["R1"][0].id);
          }

          if(response.error === "true"){
              alert(response.message);          
          }            
          else{
            //this.$navigateTo(this.avesPage);
            confirm('registro actualizado')
            .then(result => {
              console.log(result);
              this.$navigateTo(this.avesPage);
            });            
          }
        } 
        catch(error){
          alert(error.message);
        }  
      },
      borrar: async function(){
        confirm('Confirma borrar el registro?')
        .then(result => {
          console.log(result);
          this.borrarInt();
        });  
      },
      borrarInt: async function(){
          try{
            this.animalesAcc.resetOperaciones();
            var args = [];
            args.push({'id': this.id, 'type': 'INT'});
            this.animalesAcc.addOperacion("Delete", "Aves", JSON.stringify(args));
            var response = await this.animalesAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              confirm('Registro borrado')
              .then(result => {
                console.log(result);
                this.$navigateTo(this.avesPage);
              });  
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }
      },
    },
    mounted: async function(){
      if(this.id != 0){
        await this.getItem();
      }
    },
  }
</script>


<style scoped>

  .labelH1{
    font-Size: 24;
    font-weight: bold;
    background-color: light(text-primary);
  }

  .secondary{
    background-color:burlywood;
  }

</style>