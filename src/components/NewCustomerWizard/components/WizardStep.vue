<script setup lang="ts">
import WizardVariant from "./WizardVariant.vue";
import { StepType } from "../../../globalTypes";

type Props = {
  stepData: StepType;
  isActive: boolean;
};
const props = defineProps<Props>();
</script>

<template>
  <div class="step">
    <h2 class="step__title">{{ props.stepData.title }}</h2>
    <div :class="['step__variant-list', { active: props.isActive }]">
      <WizardVariant
        v-for="variant in props.stepData.variants"
        :key="variant.title"
        :variant-data="variant"
        :color="variant.color"
        :is-choosen="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.step {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 2px solid $grey;
  padding: 20px 0;

  &__title {
    font-size: $fs-subtitle;
  }

  &__variant-list {
    display: none;

    &.active {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
}
</style>
