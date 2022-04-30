<script setup lang="ts">
import BaseTextButton from "../../../base_components/BaseTextButton.vue";
import { VariantType } from "../../../globalTypes";
import WizardStandartOption from "./WizardStandartOption.vue";
import WizardLuxSelect from "./WizardLuxSelect.vue";

type Props = {
  variantData: VariantType;
  color: string;
  isChoosen: boolean;
};
const props = defineProps<Props>();
const descriptionList = props.variantData.description.split("\n");

const click = () => {
  console.log("click");
};
</script>

<template>
  <div class="variant">
    <div class="variant__column variant__column_left">
      <h3 class="variant__title">{{ props.variantData.title }}</h3>
      <div class="variant__description">
        <p v-for="description in descriptionList" :key="description">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="variant__column variant__column_right">
      <p class="variant__price">{{ props.variantData.price_default }} ₽</p>
      <div class="variant__controls">
        <WizardStandartOption
          v-for="option in props.variantData.options"
          :key="option.title"
          :option-data="option"
        />
        <WizardLuxSelect
          v-for="select in props.variantData.select"
          :key="select.title"
          :select-data="select"
        />
        <BaseTextButton :is-disabled="false" :click="click">{{
          isChoosen ? "Выбрано" : "Выбрать"
        }}</BaseTextButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

.variant {
  position: relative;
  display: flex;
  gap: 15px;
  padding: 15px 20px;
  background-color: $light-grey;
  border-radius: $br-large;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: v-bind(color);
    border-top-left-radius: $br-large;
    border-bottom-left-radius: $br-large;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &_left {
      flex-grow: 1;
      padding-right: 15px;
      border-right: 1px $border-style;
    }

    &_right {
      justify-content: space-between;
      flex-shrink: 0;
      width: 180px;
    }
  }

  &__title {
    font-size: $fs-title;
    font-weight: 600;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__price {
    font-size: $fs-subtitle;
    text-align: right;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__option-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

@media screen and (max-width: $screen-mobile) {
  .variant {
    flex-direction: column;

    &__column {
      &_left {
        padding-right: 0;
        border-right: 0;
      }

      &_right {
        width: 100%;
      }
    }
  }
}
</style>
