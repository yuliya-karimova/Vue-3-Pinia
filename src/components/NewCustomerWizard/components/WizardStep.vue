<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "@vue/runtime-dom";
import WizardVariant from "./WizardVariant.vue";
import { StepType } from "../../../globalTypes";

type Props = {
  stepData: StepType;
  stepIndex: number;
  isActive: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(["changeStep"]);

const variantList: Ref<HTMLDivElement | null> = ref(null);
let maxHeight: Ref<string> = ref("auto");

const setMaxHeight = () => {
  maxHeight.value = `${variantList.value?.scrollHeight || 0}px`;
};

const onClick = () => {
  emit('changeStep', props.stepIndex)
}

onMounted(setMaxHeight);
</script>

<template>
  <div :class="['step', { active: isActive }]">
    <h2 class="step__title" @click="onClick">
      {{ props.stepData.title }}
    </h2>
    <div
      ref="variantList"
      class="step__variant-list"
      :style="{ 'max-height': isActive ? maxHeight : '0' }"
    >
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
  padding-top: 20px;
  border-top: 2px solid $grey;
  transition: 0.1s padding-bottom ease-in-out;
  transition-delay: 0.4s;

  &__title {
    font-size: $fs-subtitle;
    color: $grey;
    transition: 0.5s color ease-in-out;
  }

  &.active {
    padding-bottom: 20px;

    .step__title {
      color: black;
    }
  }

  &__variant-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: auto;
    transition: 0.5s max-height ease-in-out;
    overflow: hidden;
  }
}
</style>
