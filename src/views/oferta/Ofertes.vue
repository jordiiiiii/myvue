<template>
  <v-container>
    <v-row fluid>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="oferta in filteredOfertes"
        :key="oferta.id"
      >
        <v-card max-width="344">
          <!--        <v-card class="mx-auto" max-width="344">-->
          <v-img :src="oferta.imageUrl" height="150px">
            <div class="ma-2">
              {{ oferta.categoria }}
            </div>
            <v-btn
              v-if="oferta.data >= dataFilter"
              color="pink"
              class="mt-9"
              dark
              small
              absolute
              top
              right
              fab
              :to="'/ofertes/' + oferta.id"
            >
              New
            </v-btn>
          </v-img>

          <v-card-title v-text="oferta.titol"></v-card-title>

          <v-card-subtitle>
            {{ oferta.localitzacio }} - {{ oferta.data }} - {{ oferta.empresa }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text :to="'/ofertes/' + oferta.id">
              Explorar
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ oferta.descripcio }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-btn-toggle
      class="filtres transparent"
      v-model="toggle_exclusive"
      mandatory
    >
      <v-col>
        <v-row class="mb-2">
          <v-btn fab small color="cyan accent-2" @click="changeFilter('ALL')">
            all
          </v-btn>
        </v-row>
        <v-row class="mb-2" v-for="categoria in categories" :key="categoria.id">
          <v-btn
            fab
            small
            color="cyan accent-2"
            @click="changeFilter(categoria.descripcio)"
          >
            {{ categoria.descripcio }}
          </v-btn>
        </v-row>
      </v-col>
    </v-btn-toggle>
  </v-container>
</template>

<script>
import DataFromNDays from "@/composables/dateTo-nDays";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Ofertes",
  data: () => ({
    show: false,
    toggle_exclusive: undefined,
    ofertFilter: "ALL",
    dataFilter: new Date(),
    correu: firebase.auth().currentUser.uid,
  }),
  computed: {
    categories() {
      return this.$store.getters.loadedCategories;
    },
    ofertes() {
      return this.$store.getters.loadedOfertes;
    },
    filteredOfertes() {
      if (this.ofertFilter === "ALL") {
        return this.ofertes;
      }
      return this.ofertes.filter((data) => data.categoria == this.ofertFilter);
    },
  },
  methods: {
    changeFilter(value) {
      this.ofertFilter = value;
    },
  },
  created() {
    this.dataFilter = DataFromNDays(15);
    this.$store.getters.loadedEmpreses;
  },
};
</script>

<style scoped>
.filtres {
  position: absolute;
  right: 16px;
  top: 32px;
}
</style>
