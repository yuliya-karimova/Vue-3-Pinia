<script setup lang="ts">
import NewCustomerWizard from "./components/NewCustomerWizard/NewCustomerWizard.vue";
</script>

<template>
  <NewCustomerWizard />
</template>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/globalStyles.scss";

#app {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
  font-family: "Roboto", sans-serif;
  font-size: $fs-base;
}
</style>
