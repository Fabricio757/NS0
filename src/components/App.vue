<template>
    <Page>
        <ActionBar title="Hola to NativeScript-Vue! 1.1">
            <StackLayout orientation="horizontal">
              <Image src="res://icon" width="40" height="40" verticalAlignment="center" v-on:tap="$navigateTo(detailPage)"/>
              <Label text="NativeScript 1.2" fontSize="24" verticalAlignment="center" />
              <Image src="res://icon" width="40" height="40" verticalAlignment="center" v-on:tap="$navigateTo(loginPage)"/>
              <Label text="Login" fontSize="24" verticalAlignment="center" v-on:tap="$navigateTo(loginPage)"/>
            </StackLayout>
        </ActionBar>
        
        <GridLayout columns="*,*" rows="*,*,*,*,*" backgroundColor="#FFFFFF" >
            <Label class="message" :text="msg" col="0" row="0" backgroundColor="#43b883"/>
            <Label row="0" col="1" backgroundColor="#43b883">Fabricio Hugo Antonini</Label>
            <TextField v-model="msg" row="1" col="0" backgroundColor="#43b883" />
            <Button text="Button" row="2" col="0" backgroundColor="#43b883"> Test </Button>
            <Button  @tap="alert('ON TAP')" row="3" col="0" backgroundColor="#FFFFFF">
              <FormattedString>
                <Span text="This text has a " />
                <Span text="red " style="color: red" />
                <Span text="piece of text. " />
                <Span text="Also, this bit is italic, " fontStyle="italic" />
                <Span text="and this bit is bold." fontWeight="bold" />
              </FormattedString>
            </Button>
            
        </GridLayout>
    </Page>
</template>

<script >
  import Login from '~/components/Login';

  export default {
    components: {

    },
    data() {
      return {
        msg: 'Hello World dd!',
        detailPage: Detail,
        loginPage: Login
      }
    },
    methods: {
    onButtonTap() {
        console.log('your message');
        alert('Your message 1.0');
      }
    }
  }

  const Detail = {
  template: `
    <Page>
      <ActionBar title="Detail" />
      
      <StackLayout>
        <Image src="res://icon" width="40" height="40" verticalAlignment="center" v-on:tap="$navigateBack"/>
        <Label text="Details.." />
      </StackLayout>
    </Page>
  `
};
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
