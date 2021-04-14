<template>
  <v-alert
    border="left"
    dense
    dismissible
    outlined
    text
    type="error"
    @input="onClose"
    :value="true"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>

<style scoped></style>
