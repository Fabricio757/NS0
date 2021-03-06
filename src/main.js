import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/fonts/fontawesome.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
