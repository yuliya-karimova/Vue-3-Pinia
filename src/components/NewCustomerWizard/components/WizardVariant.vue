<script setup lang="ts">
import BaseTextButton from "../../../base_components/BaseTextButton.vue";
import { computed } from "vue";
import { OptionType, SelectItemType, VariantType } from "../../../globalTypes";
import WizardOption from "./WizardOption.vue";
import WizardSelect from "./WizardSelect.vue";
import { useNewCustomerStore } from "../../../stores/NewCustomerStore";
import { getOptionsSum, getSelectsSum } from "../../../helpers";

const store = useNewCustomerStore();
const {
  changeSelectedVariant,
  changeCurrentStep,
  changeSelectedItem,
  checkOption,
  uncheckOption,
} = store;

type Props = {
  variantData: VariantType;
  color: string;
  stepIndex: number;
  variantIndex: number;
};
const props = defineProps<Props>();
const descriptionList = props.variantData.description.split("\n");

const isChosen = computed(
  () =>
    store.stepsResults[props.stepIndex].selectedVariant?.title ===
    props.variantData.title
);

const getPrice = computed(() => {
  const variantResult =
    store.stepsResults[props.stepIndex].variants[props.variantIndex];

  let sum = variantResult.price_default;
  sum += getOptionsSum(variantResult.options);
  sum += getSelectsSum(variantResult.selects);

  return sum;
});

const onClick = () => {
  changeSelectedVariant(props.stepIndex, props.variantData);

  if (props.stepIndex < store.stepList.length - 1) {
    changeCurrentStep(props.stepIndex + 1);
  }
};

const onSelect = (selectItemData: SelectItemType, selectIndex: number) => {
  changeSelectedItem(
    selectItemData,
    props.stepIndex,
    props.variantIndex,
    selectIndex
  );
};

const onInput = (optionData: OptionType, isChecked: boolean) => {
  if (isChecked) {
    checkOption(optionData, props.stepIndex, props.variantIndex);
  } else {
    uncheckOption(optionData, props.stepIndex, props.variantIndex);
  }
};

const isButtonDisabled = computed(() => {
  const isContainsSelect = !!props.variantData.select.length;

  if (!isContainsSelect) return false;

  const selectsResults =
    store.stepsResults[props.stepIndex].variants[props.variantIndex].selects;

  const isAllSelectesInVariantHaveValue = selectsResults.every(
    (select) => select.selectedItem
  );

  return !isAllSelectesInVariantHaveValue;
});
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
      <p class="variant__price">{{ getPrice }} ₽</p>
      <div class="variant__controls">
        <WizardOption
          v-for="option in props.variantData.options"
          :key="option.title"
          :option-data="option"
          @input="onInput"
        />
        <WizardSelect
          v-for="(select, index) in props.variantData.select"
          :key="select.title"
          :select-data="select"
          :select-index="index"
          @select="onSelect"
        />
        <BaseTextButton
          :is-disabled="isButtonDisabled"
          :is-active="isChosen"
          @click="onClick"
          >{{ isChosen ? "Выбрано" : "Выбрать" }}</BaseTextButton
        >
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
