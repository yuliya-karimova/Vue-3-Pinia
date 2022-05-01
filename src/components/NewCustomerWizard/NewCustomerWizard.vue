<script setup lang="ts">
import { computed } from "vue";
import WizardStep from "./components/WizardStep.vue";
import BaseTextButton from "../../base_components/BaseTextButton.vue";
import { useNewCustomerStore } from "../../stores/NewCustomerStore";
const store = useNewCustomerStore();

const isTotalButtonDisabled = computed(
  () => !store.connectionVariant || !store.routerVariant
);

const changeStep = (stepNumber: number) => {
  if (stepNumber)
store.changeCurrentStep
}
</script>

<template>
  <WizardStep
    v-for="(step, index) in store.steps"
    :key="step.title"
    :step-data="step"
    :step-index="index"
    :is-active="index === store.currentStep"
    @change-step="changeStep"
  />
  <BaseTextButton class="total-button" :is-disabled="isTotalButtonDisabled" :is-active="!isTotalButtonDisabled">
    <span>ИТОГО К ОПЛАТЕ</span>
    <span>{{ store.totalPrice }} ₽</span>
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
