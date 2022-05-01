<script setup lang="ts">
import WizardVariant from "./WizardVariant.vue";
import { StepType } from "../../../globalTypes";

type Props = {
  stepData: StepType;
  stepIndex: number;
  isActive: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(["changeStep"]);

const onClick = () => {
  emit("changeStep", props.stepIndex);
};
</script>

<template>
  <div :class="['step', { active: isActive }]">
    <h2 :class="['step__title', { active: isActive }]" @click="onClick">
      {{ props.stepData.title }}
    </h2>
    <div class="step__variant-list">
      <WizardVariant
        v-for="(variant, index) in props.stepData.variants"
        :key="variant.title"
        :variant-data="variant"
        :color="variant.color"
        :step-index="stepIndex"
        :variant-index="index"
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
  padding: 20px 0;
  border-top: 2px solid $grey;

  &__title {
    font-size: $fs-subtitle;
    color: $grey;
    transition: 0.4s all ease-out;
    cursor: pointer;
  }

  &__variant-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-height: 0;
    transition: 0.4s all ease-out;
    overflow: hidden;
    margin-bottom: -20px;
  }

  &.active {
    .step__title {
      color: black;
    }

    .step__variant-list {
      max-height: 100vh;
      margin-bottom: 0;
    }
  }
}
</style>
