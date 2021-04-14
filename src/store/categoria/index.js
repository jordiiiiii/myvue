// axios
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  state: {
    loadedCategories: [
      {
        id: 1,
        descripcio: "ASIX",
      },
      {
        id: 2,
        descripcio: "DAM",
      },
      {
        id: 3,
        descripcio: "DAW",
      },
      {
        id: 4,
        descripcio: "SMX",
      },
    ],
  },
  mutations: {
    setLoadedCategories(state, payload) {
      state.loadedCategories = payload;
    },
  },
  actions: {
    loadCategories({ commit }) {
      commit("setLoading", true);
      Vue.axios
        .get(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/categoria/`
        )
        .then((response) => {
          const categories = [];
          const obj = response.data.records;
          for (let key in obj) {
            categories.push({
              id: obj[key].id,
              descripcio: obj[key].descripcio,
            });
          }
          commit("setLoadedCategories", categories);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },
  getters: {
    loadedCategories(state) {
      return state.loadedCategories;
    },
  },
};
