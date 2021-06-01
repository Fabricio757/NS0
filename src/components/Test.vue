<template>
  <Page>
    <ActionBar title="NativeScript App"></ActionBar>
    <FlexboxLayout flexDirection="column">
      <Label text="Test.. 1.02 " />
      <DatePicker v-model="selectedDate" />
      <Label :text="selectedDate" style="text-align: center" />
      <button text="setDate" @tap="setDate"></button>
    </FlexboxLayout>
  </Page>
</template>
<script >
export default {
  data() {
    return {
      selectedDate: undefined,
    };
  },
  mounted: function(){
    this.selectedDate = new Date("1972-01-20");
  },
  methods:{
      setDate: function(){
          alert('setDate');
          this.selectedDate = new Date("2017-08-31");
      },
  },
};
</script>