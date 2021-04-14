<template>
  <v-dialog max-width="400px" persistent v-model="registerDialog">
    <template v-slot:activator="{ on }">
      <v-btn color="orange lighten-2" text v-on="on" class="mr-3">
        {{ userIsRegistered ? "Donar de baixa" : "Registra't" }}
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card-title v-if="userIsRegistered"
              >Voleu donar-vos de baixa de l’oferta?</v-card-title
            >
            <v-card-title v-else>Voleu inscriure-us a l’oferta?</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text
              >Sempre podeu canviar la vostra decisió més endavant.</v-card-text
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                text
                @click="registerDialog = false"
                >Cancel·lar</v-btn
              >
              <v-btn class="green--text darken-1" text @click="onAgree"
                >Confirmar</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterDialogAux",
  props: ["ofertaId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredOfertes.findIndex((ofertaId) => {
          return ofertaId === this.ofertaId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromOferta", this.ofertaId);
      } else {
        this.$store.dispatch("registerUserForOferta", this.ofertaId);
      }
      this.registerDialog = false;
    },
  },
};
</script>

<style scoped></style>
