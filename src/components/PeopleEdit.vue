<template>
    <Page>
      <ActionBar title="People Edit">
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
        <Label text="People Edit.. 1.20 " />
        <StackLayout>
          <Label :text="this.esNuevo" class="text-primary h2" textAlignment="left" />
          <Button text="Borrar" fontSize="16" horizontalAlignment="right" class="secondary -rounded-lg p-y-0" @tap="borrar()"></Button>
        </StackLayout>
        <!-- <Label :text="id" fontSize="14" textAlignment="right"/> -->
        <TextField v-model="firstname" height="70" hint="Nombre" fontSize="24"  maxLength="10" />
        <TextField v-model="lastname" height="70" hint="Apellido" fontSize="24"  maxLength="10" />

        <MyDatePicker v-model="birthday" letra="24" height="120"></MyDatePicker>

        <StackLayout class="hr" height="70"></StackLayout>
        
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
import People from '~/components/People';
import MyDatePicker from "~/components/mycomponents/MyDatePicker";

Vue.use(Vuex);


  export default {

    components: {
      MyDatePicker,
    },
    props: ['id'],
    data() {
      return {        
        firstname: '',
        lastname: '',
        birthday: 1641600000,
        peoplePage: People,
      }
    },        
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['peopleAcc']),
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
            this.peopleAcc.resetOperaciones();
            var args = [];
            args.push({'id': this.id, 'type': 'INT'});
            this.peopleAcc.addOperacion("Seleccion", "People", JSON.stringify(args));
            var response = await this.peopleAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              this.firstname = response.resultados[0].R1[0].firstname;
              this.lastname = response.resultados[0].R1[0].lastname;   
              this.birthday = response.resultados[0].R1[0].birthday;  
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
            this.peopleAcc.resetOperaciones();
            args.push({'id': this.id, 'key': 'INT'});
            args.push({ 'firstname' : this.firstname, 'type':'VARCHAR'});
            args.push({ 'lastname' : this.lastname, 'type':'VARCHAR'});
            args.push({ 'birthday' : this.birthday, 'type':'VARCHAR'});            
            this.peopleAcc.addOperacion("Update", "People", JSON.stringify(args));
            response = await this.peopleAcc.execute(this.usuarioLogueado);

          } else {
            this.peopleAcc.resetOperaciones();
            args.push({ 'firstname' : this.firstname, 'type':'VARCHAR'});
            args.push({ 'lastname' : this.lastname, 'type':'VARCHAR'});
            args.push({ 'birthday' : this.birthday, 'type':'VARCHAR'});
            this.peopleAcc.addOperacion("Insert", "People", JSON.stringify(args));
            response = await this.peopleAcc.execute(this.usuarioLogueado);  
            // if(response.error == "false")
            //   this.id = parseInt(response.resultados[0]["R1"][0].id);
          }

          if(response.error === "true"){
              alert(response.message);          
          }            
          else{
            //this.$navigateTo(this.peoplePage);
            confirm('registro actualizado')
            .then(result => {
              console.log(result);
              this.$navigateTo(this.peoplePage);
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
            this.peopleAcc.resetOperaciones();
            var args = [];
            args.push({'id': this.id, 'type': 'INT'});
            this.peopleAcc.addOperacion("Delete", "People", JSON.stringify(args));
            var response = await this.peopleAcc.execute(this.usuarioLogueado);
            if(response.error === "false"){              
              confirm('Registro borrado')
              .then(result => {
                console.log(result);
                this.$navigateTo(this.peoplePage);
              });  
            }else{
              alert(response.message);  
            }
          }
          catch(error) {
            alert(error.message);
          }
      },
      SetNow: async function(){
        this.fechaNac = "Fecha Nacimiento";
      },
    },
    mounted: async function(){
      if(this.id != 0){
        await this.getItem();
      }
    },
  }
</script>


<style>

  .labelH1{
    font-Size: 24;
    font-weight: bold;
    background-color: light(text-primary);
  }

  .secondary{
    background-color:burlywood;
  }

</style>