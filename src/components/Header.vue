<template>
  <nav>
    <!--SideBar-->
    <v-navigation-drawer app v-model="drawer">
      <v-list nav dense flat>
        <v-list-item
          color="primary"
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          :href="item.href"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--Header-->
    <v-app-bar
      app
      absolute
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-toolbar-title>
        <router-link
          to="/"
          custom
          v-slot="{ navigate }"
          style="cursor: pointer"
        >
          <img
            @click="navigate"
            @keypress.enter="navigate"
            role="link"
            alt="Vuetify Logo"
            class="shrink mt-2 mr-4 hidden-sm-and-up"
            src="../assets/logo.svg"
            width="32"
          />
        </router-link>

        <router-link to="/" class="text-uppercase grey--text hidden-xs-only">
          <span class="font-weight-light">borsa</span>
          <span>Treball</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          class="grey--text text--darken-1"
          v-for="item in items"
          :key="item.title"
          :to="item.route"
          :href="item.href"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <v-btn
          text
          class="grey--text text--darken-1"
          v-if="userIsAuthenticated"
          @click="onLogout"
        >
          <v-icon left dark>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>

      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data: () => ({ drawer: false }),
  computed: {
    items() {
      let items = [
        {
          title: "Empresa",
          icon: "mdi-bank-outline",
          route: "",
          href: "http://cryptic-springs-68672.herokuapp.com",
        },
        {
          title: "Sign up",
          icon: "mdi-face",
          route: "",
          href: "http://cryptic-springs-68672.herokuapp.com/register",
        },
        {
          title: "Sign in",
          icon: "mdi-lock-open",
          route: "/signin",
          href: "",
        },
      ];
      if (this.userIsAuthenticated) {
        items = [
          { title: "Ofertes", icon: "mdi-view-dashboard", route: "/ofertes" },
          // { title: "Empresa", icon: "mdi-bank-outline", route: "/oferta/nova" },
          { title: "Profile", icon: "mdi-account", route: "/profile" },
        ];
      }
      return items;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped></style>
