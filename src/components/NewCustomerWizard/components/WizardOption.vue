<script setup lang="ts">
import { OptionType } from "../../../globalTypes";
import BaseCheckbox from "../../../base_components/BaseCheckbox.vue";
import { useNewCustomerStore } from "../../../stores/NewCustomerStore";
const { checkOption, uncheckOption } =
  useNewCustomerStore();

type Props = {
  optionData: OptionType;
};
const props = defineProps<Props>();

const onInput = (isChecked: boolean) => {
  isChecked ? checkOption(props.optionData) : uncheckOption(props.optionData);
};
</script>

<template>
  <BaseCheckbox
    :text="props.optionData.title"
    @input="onInput"
  />
</template>
