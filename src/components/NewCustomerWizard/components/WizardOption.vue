<script setup lang="ts">
import { OptionType } from "../../../globalTypes";
import BaseCheckbox from "../../../base_components/BaseCheckbox.vue";

type Props = {
  optionData: OptionType;
};
const props = defineProps<Props>();
const emit = defineEmits(["input"]);

const onInput = (isChecked: boolean) => {
  emit("input", props.optionData, isChecked);
};
</script>

<template>
  <BaseCheckbox
    :text="props.optionData.title"
    @input="onInput"
  />
</template>
