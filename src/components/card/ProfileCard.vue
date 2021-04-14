<template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ candidat.nom }} {{ candidat.cognom1 }} {{ candidat.cognom2 }}
              </v-list-item-title>
              <v-list-item-subtitle class="mb-1">
                email: {{ candidat.email }} | phone: {{ candidat.telefon }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "ProfileCard",
  computed: {
    candidat() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped></style>
