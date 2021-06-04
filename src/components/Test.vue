<template>
  <Page>
    <ActionBar title="NativeScript App"></ActionBar>
    <FlexboxLayout flexDirection="column">
      <button text="Set" fontSize="16" horizontalAlignment="center" width="30%" class="secondary -rounded-lg p-y-0" @tap="SetNow"></button>
      <button text="Get" fontSize="16" horizontalAlignment="center" width="30%" class="secondary -rounded-lg p-y-0" @tap="getdate"></button>

      <Label v-model="birthday"/>
      <MyDatePicker2 v-model="birthday"></MyDatePicker2>

    </FlexboxLayout>
  </Page>
</template>
<script >

import MyDatePicker from "~/components/mycomponents/MyDatePicker";
import MyDatePicker2 from "~/components/mycomponents/MyDatePicker2";

export default {
  components:{
        MyDatePicker, 
        MyDatePicker2,
    },
  data() {
    return {
      ahora: '*****',
      birthday: Date.now(),
    };
  },
  methods:{
    SetNow: function(){
      this.birthday = new Date("1/20/1972");
    },
    getdate: function(){
      alert(this.birthday);
    },
  },
};
</script>