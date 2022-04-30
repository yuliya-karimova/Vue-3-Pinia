<script setup lang="ts">
import WizardStep from "./components/WizardStep.vue";
import BaseTextButton from "../../base_components/BaseTextButton.vue";
import { useNewCustomerStore } from "../../stores/NewCustomerStore";
const { steps, currentStep, totalPrice } = useNewCustomerStore();
</script>

<template>
  <WizardStep
    v-for="(step, index) in steps"
    :key="step.title"
    :step-data="step"
    :is-active="index === currentStep"
  />
  <BaseTextButton class="total-button">
    <span>ИТОГО К ОПЛАТЕ</span>
    <span>{{ totalPrice }} ₽</span>
  </BaseTextButton>
</template>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
.total-button {
  display: flex;
  justify-content: space-between;
  padding: 14px;
  font-size: 24px;
  font-weight: 600;
}
</style>
