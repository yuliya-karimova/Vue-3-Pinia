<script setup lang="ts">
import { computed } from "vue";
import { OptionType } from "../../../globalTypes";
import BaseCheckbox from "../../../base_components/BaseCheckbox.vue";
import { useNewCustomerStore } from "../../../stores/NewCustomerStore";
const { standartCheckedOptions, checkOption, uncheckOption } =
  useNewCustomerStore();

type Props = {
  optionData: OptionType;
};
const props = defineProps<Props>();

const isChecked = computed(() => {
  return !!standartCheckedOptions.find(
    ({ title }) => title === props.optionData.title
  );
});

const onInput = (isChecked: boolean) => {
  isChecked ? checkOption(props.optionData) : uncheckOption(props.optionData);
};
</script>

<template>
  <BaseCheckbox
    :text="props.optionData.title"
    :is-checked="isChecked"
    @input="onInput"
  />
</template>
