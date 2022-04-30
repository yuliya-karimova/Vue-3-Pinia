<script setup lang="ts">
import { computed } from "vue";
import { OptionType } from "../../../globalTypes";
import BaseCheckbox from "../../../base_components/BaseCheckbox.vue";
import { useNewCustomerStore } from "../../../stores/NewCustomerStore";
const { standartVariantCheckedOptions, checkStandartOption, uncheckStandartOption } = useNewCustomerStore();

type Props = {
  optionData: OptionType;
};
const props = defineProps<Props>();

const isChecked = computed(() => {
  return !!standartVariantCheckedOptions.find(({title}) => title === props.optionData.title)
});

const input = (isChecked: boolean) => {
  isChecked ? checkStandartOption(props.optionData) : uncheckStandartOption(props.optionData)
}

</script>

<template>
  <BaseCheckbox :text="props.optionData.title" :is-checked="isChecked" @input="input" />
</template>
