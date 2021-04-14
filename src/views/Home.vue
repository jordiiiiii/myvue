<template>
  <v-container class="home">
    <!--Missatge de Benvinguda-->
    <v-row>
      <v-col cols="12" class="text-center pb-0">
        <h1 class="display-1 grey--text">Busca la teva oferta</h1>
      </v-col>
    </v-row>

    <!--Loading-->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="2"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <!--Carousel ofertes-->
    <v-row class="fill-height" align="center" justify="center" v-if="!loading">
      <v-col cols="12">
        <v-carousel
          cycle
          height="200"
          hide-delimiter-background
          :show-arrows="false"
          delimiter-icon="mdi-minus"
        >
          <v-carousel-item
            v-for="(oferta, index) in ofertes"
            :key="index"
            :src="oferta.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row class="fill-height" align="end" justify="center">
              <!--title-->
              <div class="display-1 mb-10">
                {{ oferta.titol }} - {{ oferta.categoria }}
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!--Links-->
    <div v-if="!userIsAuthenticated">
      <v-row class="mt-6" v-if="inici">
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <v-btn width="112" @click="inici = false"> Usuari </v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <v-btn width="112" href="http://cryptic-springs-68672.herokuapp.com">
            Empresa
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-6" v-else>
        <v-col cols="12" sm="6" class="text-center text-sm-right">
          <v-btn width="112" to="/signin"> Sign in </v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-left">
          <v-btn
            width="112"
            href="http://cryptic-springs-68672.herokuapp.com/register"
          >
            Sign up
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row class="mt-6">
        <v-col cols="12" class="text-center">
          <v-btn width="112" href="http://cryptic-springs-68672.herokuapp.com">
            Empresa
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!--Ofertes registrades-->
    <v-row class="fill-height mt-12" align="center" justify="center">
      <v-col cols="12" class="text-center headline grey--text">
        Grafics ofertes per categories
      </v-col>
    </v-row>
    <Graphics />
  </v-container>
</template>

<script>
import Graphics from "@/components/Graphics";
export default {
  name: "Home",
  components: { Graphics },
  data: () => ({ inici: true }),
  computed: {
    ofertes() {
      return this.$store.getters.featuredOfertes;
    },
    loading() {
      return this.$store.getters.loading;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
};
</script>

<style scoped>
/*.title {*/
/*  color: rgba(0, 0, 0, 0.5);*/
/*}*/
</style>
