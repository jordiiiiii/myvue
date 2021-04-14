// axios
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  state: {
    loadedEmpreses: [
      {
        id: 1,
        usuari_id: 9,
        nom: "empresa1",
        tipus: "titol1",
        logo: "2019-03-11",
        correu: "empresa1@mail.com",
      },
    ],
  },
  mutations: {
    setLoadedEmpreses(state, payload) {
      state.loadedEmpreses = payload;
    },
  },
  actions: {
    loadEmpreses({ commit }) {
      commit("setLoading", true);
      Vue.axios
        .get(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/empresa/`
        )
        .then((response) => {
          const empreses = [];
          const obj = response.data.records;
          for (let key in obj) {
            empreses.push({
              id: obj[key].id,
              usuari_id: obj[key].usuari_id,
              nom: obj[key].nom,
              tipus: obj[key].tipus,
              logo: obj[key].logo,
              correu: obj[key].correu,
            });
          }
          commit("setLoadedEmpreses", empreses);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },
  getters: {
    loadedEmpreses(state) {
      return state.loadedEmpreses;
    },
  },
};
