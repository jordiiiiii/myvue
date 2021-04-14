import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
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
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
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
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
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
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registrations/")
        .push(payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerUserForOferta", { id: payload, fbKey: data.key });
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
      firebase
        .database()
        .ref("/users/" + user.id + "/registrations/")
        .child(fbKey)
        .remove()
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
      firebase
        .database()
        .ref("/users/" + getters.user.id + "/registrations/")
        .once("value")
        .then((data) => {
          const dataPairs = data.val();
          let registeredOfertes = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredOfertes.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredOfertes: registeredOfertes,
            fbKeys: swappedPairs,
          };
          commit("setLoading", false);
          commit("setUser", updatedUser);
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
