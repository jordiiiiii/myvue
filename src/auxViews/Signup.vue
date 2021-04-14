<template>
  <v-container class="signup">
    <v-row v-if="error">
      <v-col cols="12" sm="6" class="offset-sm-3">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" class="offset-sm-3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      requiered
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label="Contrasenya"
                      id="password"
                      v-model="password"
                      type="password"
                      requiered
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="confirmPassword"
                      label="Confirmar Contrasenya"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      type="submit"
                      class="ma-2"
                      :loading="loading"
                      :disabled="loading"
                      @click="loader = 'loading'"
                    >
                      Sign Up
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Les contrasenyes no coincideixen"
        : true;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.replace("/ofertes");
      }
    },
  },
  methods: {
    onSignup() {
      if (this.comparePasswords === true) {
        this.$store.dispatch("signUserUp", {
          email: this.email,
          password: this.password,
        });
      } else {
        console.log("Les contrasenyes no coincideixen");
      }
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style scoped></style>
