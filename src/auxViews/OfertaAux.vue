<template>
  <v-container class="my-16">
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-img :src="oferta.imageUrl" height="200px">
            <div class="ma-2">
              {{ oferta.empresa }}
            </div>
          </v-img>

          <v-card-title> {{ oferta.titol }} </v-card-title>

          <v-card-subtitle>
            {{ oferta.localitzacio }} | {{ oferta.data | formatData }}
          </v-card-subtitle>

          <v-card-text>
            {{ oferta.descripcio }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-oferta-register-dialog
              :ofertaId="oferta.id"
            ></app-oferta-register-dialog>
            <!--            <app-oferta-register-dialog-->
            <!--                v-if="userIsAuthenticated && !userIsCreator"-->
            <!--                :ofertaId="oferta.id"-->
            <!--            ></app-oferta-register-dialog>-->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OfertaAux",
  props: ["id"],
  data: () => ({}),
  computed: {
    oferta() {
      return this.$store.getters.loadedOferta(this.id);
    },
    // userIsAuthenticated() {
    //   return (
    //     this.$store.getters.user !== null &&
    //     this.$store.getters.user !== undefined
    //   );
    // },
    // userIsCreator() {
    //   if (!this.userIsAuthenticated) {
    //     return false;
    //   }
    //   return this.$store.getters.user.id == this.oferta.creatorId;
    // },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped></style>
