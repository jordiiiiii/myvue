<template>
  <v-card class="mx-auto" max-width="344" color="pink lighten-1" dark>
    <v-card-title> {{ empresa.nom }} </v-card-title>

    <v-card-subtitle>
      {{ empresa.tipus }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "EmpresesCardList",
  props: ["empresa"],
};
</script>

<style scoped></style>
