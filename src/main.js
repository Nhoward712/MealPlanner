import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '@fortawesome/fontawesome-free'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import firebase from "firebase/app";
import 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

Vue.use(Vuex);
library.add(faTrash, faPlusCircle, faMinusCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//for global variables and states
const store = new Vuex.Store({
    state: {
        count: 0,
        userName: "",
        userRole: "",
        currentUser: "",
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setUserName(state, userName){
            state.userName = userName;
            console.log("userName set in Main to:", state.userName);
        }

    }
});
store.commit('increment');


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


run();


export var il = [];
// export var rec = [];

function run(){

    db.collection(`ingredientList`)
        .get()
        .then((snapshotChange) => {
          il = [];
          snapshotChange.forEach((doc) => {
            il.push({
                ingredientId: doc.data().ingredientId,
                name: doc.data().name,
                onHand: doc.data().onHand,
                purchased: doc.data().purchased,
                cost: doc.data().cost,
              }
          );
        });
    })

        .then(()=> {
          new Vue({
              store: store,//this injects Vuex into each component. Access with this.$store.state.variable
              router,
            render: h => h(App),

          }).$mount('#app')
        });
}



Vue.config.productionTip = false;

//local JSON db access
// export const db = require('./ingredients.json');

