<template>
  <StackLayout>
    <GridLayout columns="6*,40" rows="50">
      <Label :text="textlocalValue" fontSize="16" style="text-align: left" row="0" col="0" />
      <Label class="fa fa-regular" :text="'fa-calendar' | fonticon" textAlignment="right" @tap="toggleDP" row="0" col="1"/>
    </GridLayout>
    <FlexboxLayout width="80%" flexDirection="column" :visibility="this.isItemVisible" class="secondary -rounded-lg">      
      <DatePicker v-model="calendarValue"/> 
      <StackLayout orientation="Horizontal" horizontalAlignment="center">
        <button text="Aceptar" fontSize="14" width="30%" class="-rounded-lg p-y-0 m-x-5" @tap="toggleAceptar"></button>
        <button text="Cancelar" fontSize="14" width="30%" class="-rounded-lg p-y-0 m-x-5" @tap="toggleDP"></button>
      </StackLayout>
    </FlexboxLayout >
  </StackLayout>
</template>

<script>



export default {
    props: {
        value: {
          required: true
        },
        hint: '',
      },
    data() {
      return {
        localValue: this.value,
        isItemVisible: 'collapsed',
        calendarValue: undefined,
      }
    },
    computed: {
      loginText() {return this.usuarioLogueado.firstName },
      textlocalValue() {
        var d = new Date(this.localValue);
        var n = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        return n;
        },
    },
    watch: {
        localValue (newValue) {
          this.$emit('input', newValue)
        },
        value (newValue) {
          this.localValue = newValue
        },
     },
    methods: {
      toggleDP: function(){
        if(this.isItemVisible === 'collapsed'){
          this.calendarValue = this.localValue;
          this.isItemVisible = 'visible';
        }else{
          //this.localValue = this.calendarValue;
          this.isItemVisible = 'collapsed';
        }
      },
      toggleAceptar: function(){
          this.localValue = this.calendarValue;
          this.isItemVisible = 'collapsed';
      },
    },
}
</script>

