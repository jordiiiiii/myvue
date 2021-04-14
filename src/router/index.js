import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ofertes from "@/views/oferta/Ofertes";
import Oferta from "@/views/oferta/Oferta";
import Signup from "@/auxViews/Signup";
import Signin from "@/views/usuari/Signin";
import Profile from "@/views/usuari/Profile";
import AuthGuard from "@/router/auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ofertes",
    name: "Ofertes",
    component: Ofertes,
    beforeEnter: AuthGuard,
  },
  {
    path: "/ofertes/:id",
    name: "Oferta",
    props: true,
    component: Oferta,
    beforeEnter: AuthGuard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
