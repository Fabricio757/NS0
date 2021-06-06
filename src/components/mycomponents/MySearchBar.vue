<template>
  <StackLayout width="80%" height="height" horizontalAlignment="center" class="m-x-12">
    
    <GridLayout columns="6*,60" rows="50">
      <!-- <SearchBar hint="Buscar" v-model="searchPhrase" borderWidth="1" /> -->
      <Label class="fa fa-regular" :text="'fa-search' | fonticon" textAlignment="left" @tap="toggleDP" row="0" col="1"  backgroundColor="#43b883"/>
    </GridLayout>

    <FlexboxLayout  :visibility="this.isItemVisible" flexDirection="column" class="secondary -rounded-sm p-y-0"> 
      <slot></slot>     
      <StackLayout orientation="Horizontal" horizontalAlignment="center">
        <button text="Aceptar" fontSize="14" width="33%" class="-rounded-lg p-y-0 m-x-5"  @tap="toggleAceptar"></button>
        <button text="Cancelar" fontSize="14" width="33%" class="-rounded-lg p-y-0 m-x-5" @tap="toggleDP"></button>
      </StackLayout>
    </FlexboxLayout >
  </StackLayout>
</template>

<script>

import Utils from '~/js/Utils';

export default {
    props: {
        // value: {
        //   required: true
        // },
        height: '',
      },
    data() {
      return {
        utils: new Utils(),

        localValue: this.value,
        isItemVisible: 'visible',
      }
    },
    computed: {
    },
    // watch: {
    //     localValue (newValue) {
    //       try{
    //       this.$emit('input', newValue)
    //       }
    //       catch(error)
    //       {
    //         console.log(error);
    //         alert(error.message)
    //       }
    //     },
    //     value (newValue) {
    //       try{
    //       this.localValue = newValue
    //       }
    //       catch(error)
    //       {
    //         console.log(error);
    //         alert(error.message)
    //       }
    //     },
    //  },
    methods: {
      toggleDP: function(){
        if(this.isItemVisible === 'collapsed'){
          //this.calendarDateValue = new Date(this.localValue);
          this.isItemVisible = 'visible';
        }else{
          this.isItemVisible = 'collapsed';
        }
      },
      toggleAceptar: function(){
          //this.localValue = Date.parse(this.calendarDateValue);          
          this.isItemVisible = 'collapsed';
          this.$emit('searched');
      },

    },
}
</script>

<style scoped>
  
  .Label:after {
    background: #90EE90;
  }
</style>
