<template>
    <GridLayout columns="6*,40" rows="50">
        <TextField row="0" col="0" v-model="localValue" fontSize="24" borderWidth="2"  :hint="hint"></TextField>
        <Label row="0" col="1" class="fa" fontSize="36" :text="'fa-qrcode' | fonticon" 
                horizontalAlignment="left" verticalAlignment="center" @tap="onScanResult"                
                />
    </GridLayout>
</template>

<script>

  var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
  var barcodescanner = new BarcodeScanner();

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
      }
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
        onScanResult: async function(){
            var data = await this.scanQR();
            if(! data.error){
                this.localValue = data.data;
            }else{
                alert(data.data);
            }
            
            console.log("onScanResult: " + this.localValue);
        },
        scanQR: async function(){

            return await barcodescanner.scan({
                formats: "QR_CODE,EAN_13",   // Pass in of you want to restrict scanning to certain types
                cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
                message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                showFlipCameraButton: true,   // default false
                preferFrontCamera: false,     // default false
                showTorchButton: true,        // default false
                beepOnScan: true,             // Play or Suppress beep on scan (default true)
                fullScreen: true,             // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
                torchOn: false,               // launch with the flashlight on (default false)
                closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
                resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                orientation: "portrait",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
                openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
            }).then(
                function(result) {
                    return ({"data": result.text, "error": false});
                },
                function(error) {
                    return ({"data": error, "error": true});                    
                }
            );
        }
    },
}
</script>