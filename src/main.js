import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import firebase from "firebase/app";
import 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
// import './ingredients.json'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBJs1msazwD52CZCUGoRnaZars15Jz-dO0",
  authDomain: "mealplanner-60292.firebaseapp.com",
  projectId: "mealplanner-60292",
  storageBucket: "mealplanner-60292.appspot.com",
  messagingSenderId: "550936540047",
  appId: "1:550936540047:web:6f9586bd19dad0c095d1fa"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();


Vue.config.productionTip = false;

//local JSON db access
// export const db = require('./ingredients.json');

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
