<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="oferta.imageUrl" height="150px">
      <div class="ma-2">{{ oferta.categoria }} | {{ oferta.empresa }}</div>
    </v-img>

    <v-card-title> {{ oferta.titol }} </v-card-title>

    <v-card-subtitle>
      {{ oferta.localitzacio }} | {{ oferta.data | formatData }}
    </v-card-subtitle>

    <v-card-text>
      {{ oferta.descripcio }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "OfertesCardList",
  props: ["oferta"],
};
</script>

<style scoped></style>
