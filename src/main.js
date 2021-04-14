import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// database
import firebase from "firebase/app";
import store from "./store";
// styles
import vuetify from "./plugins/vuetify";
import "./assets/main.css";
// filters & alerts & dialogs
import DateFilter from "./composables/dateFilter";
import AlertComponent from "./components/shared/Alert";
import RegisterDialog from "./components/registration/RegisterDialog";

Vue.config.productionTip = false;

// filters & alerts & dialogs
Vue.filter("formatData", DateFilter);
Vue.component("app-alert", AlertComponent);
Vue.component("app-oferta-register-dialog", RegisterDialog);

// inicialitzar Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQFwjbLWsw4H4y233-FyFZoNB02GMSV1Q",
  authDomain: "auth-ninja-4b629.firebaseapp.com",
  projectId: "auth-ninja-4b629",
  storageBucket: "gs://auth-ninja-4b629.appspot.com",
  messagingSenderId: "152631296085",
  appId: "1:152631296085:web:946561343b767c799314dc",
  measurementId: "G-7TYLCT5K70",
};

// Inialitzar app
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadCategories");
    this.$store.dispatch("loadEmpreses");
    this.$store.dispatch("loadOfertes");
    this.$store.dispatch("trackUsers");
  },
}).$mount("#app");
