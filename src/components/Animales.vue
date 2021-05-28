<template>
    <Page>
        <ActionBar title="Aves">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
            <ActionItem>
            <StackLayout orientation="horizontal" horizontalAlignment="right">                        
                <Label class="fa fa-regular" :text="'fa-login' | fonticon" textAlignment="right"/>
                <Label :text="loginText" fontSize="14" textAlignment="right"/>        
            </StackLayout>
            </ActionItem>
        </ActionBar>

        <StackLayout>        
            <Label text="Animales Edit.. 1.28 " />
            <QRTextField v-model="qrValue" hint="lea qr"></QRTextField>
        </StackLayout>
    </Page>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';
//import AvesEdit from '~/components/AvesEdit';
import QRTextField from "~/components/mycomponents/QRTextField";

    Vue.use(Vuex);
    var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
    var barcodescanner = new BarcodeScanner();

export default {
    components:{
        QRTextField
    },
    data() {
      return {
        qrValue: "",
      }
    },
    computed:{
        ...Vuex.mapState(['usuarioLogueado']),
        ...Vuex.mapGetters(['animalesAcc']),
        loginText() {return this.usuarioLogueado.firstName },
    },
    methods: {

    },
}
</script>

<style scoped>

</style>