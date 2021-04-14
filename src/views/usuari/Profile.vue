<template>
  <v-container class="expand">
    <v-row fluid align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <ProfileCard></ProfileCard>
      </v-col>
    </v-row>

    <v-row fluid>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="ofe in filteredOfertes"
        :key="ofe.id"
      >
        <OfertesCardList :oferta="ofe"></OfertesCardList>
      </v-col>
    </v-row>

    <v-row fluid>
      <v-col cols="12" sm="6" md="3" v-for="emp in empreses" :key="emp.id">
        <EmpresesCardList :empresa="emp"></EmpresesCardList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OfertesCardList from "@/components/card/OfertesCardList";
import EmpresesCardList from "@/components/card/EmpresesCardList";
import ProfileCard from "@/components/card/ProfileCard";
export default {
  name: "Profile",
  components: {
    OfertesCardList,
    EmpresesCardList,
    ProfileCard,
  },
  computed: {
    ofertes() {
      return this.$store.getters.loadedOfertes;
    },
    empreses() {
      return this.$store.getters.loadedEmpreses;
    },
    filteredOfertes() {
      return this.ofertes.filter((data) => this.userIsRegistered(data.id));
    },
  },
  methods: {
    userIsRegistered(ofId) {
      return (
        this.$store.getters.user.registeredOfertes.findIndex((ofertaId) => {
          return ofertaId === ofId;
        }) >= 0
      );
    },
  },
};
</script>

<style scoped>
.expand {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 128px);
}
</style>
