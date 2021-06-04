<template>
  <StackLayout height="height" horizontalAlignment="center" class="m-x-12">
    <GridLayout columns="6*,40" rows="50">
      <Label :text="this.visibleDate" :fontSize="this.letra" style="text-align: left" row="0" col="0" />
      <Label class="fa fa-regular" :text="'fa-calendar' | fonticon" textAlignment="right" @tap="toggleDP" row="0" col="1"/>
    </GridLayout>
    <FlexboxLayout width="80%" flexDirection="column" :visibility="this.isItemVisible" class="secondary -rounded-lg p-y-0">      
      
      <!-- <TextField v-model="calendarValue"  /> -->
      <DatePicker v-model="calendarDateValue" class="m-y-0 p-y-0"/>
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
        value: {
          required: true
        },
        hint: '',
        letra: '',
        height: '',
      },
    data() {
      return {
        utils: new Utils(),

        localValue: this.value,
        isItemVisible: 'collapsed',
        calendarDateValue: new Date(0),
      }
    },
    computed: {
      loginText() {return this.usuarioLogueado.firstName },
      visibleDate() {
        //return this.dateToText(new Date(this.localValue));
        return this.utils.dateToDMY(this.localValue);
      },
    },
    watch: {
        localValue (newValue) {
          try{
          this.$emit('input', newValue)
          }
          catch(error)
          {
            console.log(error);
            alert(error.message)
          }
        },
        value (newValue) {
          try{
          this.localValue = newValue
          }
          catch(error)
          {
            console.log(error);
            alert(error.message)
          }
        },
     },
    methods: {
      dateToText(fecha) {
        try{
            var d = fecha;
            var n = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
            return n;
          }
          catch(error)
          {
            console.log(error);
            alert(error.message)
          }
        },
      toggleDP: function(){
        if(this.isItemVisible === 'collapsed'){
          this.calendarDateValue = new Date(this.localValue);
          this.isItemVisible = 'visible';
        }else{
          this.isItemVisible = 'collapsed';
        }
      },
      toggleAceptar: function(){
          this.localValue = Date.parse(this.calendarDateValue);
          this.isItemVisible = 'collapsed';
      },
    },
}
</script>

