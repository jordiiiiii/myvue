import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
// axios
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import Api from "@/service/api";

Vue.use(VueAxios, axios);

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    registerUserForOferta(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredOfertes.findIndex((oferta) => oferta.id === id) >=
        0
      ) {
        return;
      }
      state.user.registeredOfertes.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserFromOferta(state, payload) {
      const registeredOfertes = state.user.registeredOfertes;
      registeredOfertes.splice(
        registeredOfertes.findIndex((oferta) => oferta.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
  },
  actions: {
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      Vue.axios
        .get(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/user?filter=roles,eq,["ROLE_USER"]&filter=email,eq,${payload.email}`
        )
        .then((response) => {
          let res = response.data.records;
          if (res.length === 0) {
            let error = {
              message: "No hi ha cap usuari o candidat amb aquest mail",
            };
            commit("setError", error);
          } else {
            firebase
              .auth()
              .signInWithEmailAndPassword(payload.email, payload.password)
              .then((user) => {
                commit("setLoading", false);
                const newUser = {
                  id: user.uid,
                  registeredOfertes: [],
                  fbKeys: {},
                };
                commit("setUser", newUser);
              })
              .catch((error) => {
                if (error.code === "auth/user-not-found") {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      payload.email,
                      payload.password
                    )
                    .then((user) => {
                      commit("setLoading", false);
                      const newUser = {
                        id: user.uid,
                        registeredOfertes: [],
                        fbKeys: {},
                      };
                      commit("setUser", newUser);
                    })
                    .catch((error) => {
                      commit("setLoading", false);
                      commit("setError", error);
                      console.log(error);
                    });
                } else {
                  commit("setLoading", false);
                  commit("setError", error);
                  console.log(error);
                }
              });
          }
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredOfertes: [], fbKeys: {} });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    registerUserForOferta({ commit, getters }, payload) {
      commit("setLoading", true);
      const registreOferta = {
        oferta_id: payload,
        candidat_id: getters.user.candidat_id,
      };
      Vue.axios
        .post(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/ofertes_candidats`,
          registreOferta
        )
        .then((data) => {
          commit("registerUserForOferta", {
            id: payload,
            fbKey: data.data,
          });
          fetch("https://api.ipify.org/?format=json")
            .then((results) => results.json())
            .then(({ ip }) => {
              const direccioIp = ip;
              const registres = {
                correu: getters.user.email,
                ip: direccioIp,
                data: new Date(),
                nom: getters.user.nom,
                cognom1: getters.user.cognom1,
                cognom2: getters.user.cognom2,
                oferta_id: payload,
              };
              Vue.axios
                .post(
                  `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/registres`,
                  registres
                )
                .then(() => {
                  commit("setLoading", false);
                })
                .catch((error) => {
                  console.log(error);
                  commit("setLoading", false);
                });
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    unregisterUserFromOferta({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      Vue.axios
        .delete(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/ofertes_candidats/${fbKey}`
        )
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserFromOferta", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      const userEmail = firebase.auth().currentUser.email;
      Vue.axios
        .get(
          `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/user?filter=email,eq,${userEmail}`
        )
        .then((response) => {
          let res = response.data.records;
          const usuari_id = res[0].id;
          Vue.axios
            .get(
              `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/candidat?filter=usuari_id,eq,${usuari_id}`
            )
            .then((response) => {
              let res = response.data.records;
              let updatedUser = "";
              if (res.length === 0) {
                console.log("No hi ha cap candidat amb aquest id");
                updatedUser = {
                  id: getters.user.id,
                  usuari_id: usuari_id,
                  email: userEmail,
                  registeredOfertes: [],
                  fbKeys: {},
                };
                commit("setLoading", false);
                commit("setUser", updatedUser);
              } else {
                const candidat_id = res[0].id;
                const nom = res[0].nom;
                const cognom1 = res[0].cognom1;
                const cognom2 = res[0].cognom2;
                const telefon = res[0].telefon;
                Vue.axios
                  .get(
                    `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/ofertes_candidats?filter=candidat_id,eq,${candidat_id}`
                  )
                  .then((response) => {
                    let res = response.data.records;
                    if (res.length === 0) {
                      console.log("El candidat no esta registrat a cap oferta");
                      updatedUser = {
                        id: getters.user.id,
                        usuari_id: usuari_id,
                        email: userEmail,
                        candidat_id: candidat_id,
                        nom: nom,
                        cognom1: cognom1,
                        cognom2: cognom2,
                        telefon: telefon,
                        registeredOfertes: [],
                        fbKeys: {},
                      };
                    } else {
                      console.log("El candidat si te registrades ofertes");
                      const dataPairs = response.data.records;
                      let registeredOfertes = [];
                      let swappedPairs = {};
                      for (let key in dataPairs) {
                        registeredOfertes.push(dataPairs[key].oferta_id);
                        swappedPairs[dataPairs[key].oferta_id] =
                          dataPairs[key].id;
                      }
                      updatedUser = {
                        id: getters.user.id,
                        usuari_id: usuari_id,
                        email: userEmail,
                        candidat_id: candidat_id,
                        nom: nom,
                        cognom1: cognom1,
                        cognom2: cognom2,
                        telefon: telefon,
                        registeredOfertes: registeredOfertes,
                        fbKeys: swappedPairs,
                      };
                    }
                    commit("setLoading", false);
                    commit("setUser", updatedUser);
                  })
                  .catch((error) => {
                    console.log(error);
                    commit("setLoading", false);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
              commit("setLoading", false);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    trackUsers() {
      fetch("https://api.ipify.org/?format=json")
        .then((results) => results.json())
        .then(({ ip }) => {
          const direccioIp = ip;
          const track = {
            ip: direccioIp,
            data: new Date(),
          };
          Vue.axios
            .post(
              `http://labs.iam.cat/~a18jorgornei/projecte3/back/api.php/records/track`,
              track
            )
            .then(() => {
              console.log("tracked!!!");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendEmal({ commit, getters }) {
      commit("setLoading", true);
      Vue.axios({
        method: "post",
        url: "http://cryptic-springs-68672.herokuapp.com/email",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: getters.user.email,
          missatge: "yoyo",
        },
      })
        .then((data) => {
          console.log(data);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
