<template>
  <Page>
    <ActionBar title="NativeScript App"></ActionBar>
    <FlexboxLayout flexDirection="column">
      <Label :text="this.ahora"/>
      <MyDatePicker v-model="ahora"></MyDatePicker>
      <button text="Set" fontSize="16" horizontalAlignment="center" width="30%" class="secondary -rounded-lg p-y-0" @tap="SetNow"></button>
    </FlexboxLayout>
  </Page>
</template>
<script >

import MyDatePicker from "~/components/mycomponents/MyDatePicker";

export default {
  components:{
        MyDatePicker
    },
  data() {
    return {
      ahora: Date.now(),
    };
  },
  methods:{
    SetNow: function(){
      this.ahora = Date.now();
    },
  },
};
</script>