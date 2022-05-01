<script setup lang="ts">
import { SelectType } from "../../../globalTypes";
import BaseSelect from "../../../base_components/BaseSelect.vue";
import { useNewCustomerStore } from "../../../stores/NewCustomerStore";
const { selectLuxOption } = useNewCustomerStore();

type Props = {
  selectData: SelectType;
};
const props = defineProps<Props>();

const onSelect = (selectValue: string) => {
  const optionData = props.selectData.items.find(
    (item) => item.title === selectValue
  );
  if (optionData) selectLuxOption(optionData);
};
</script>

<template>
  <BaseSelect
    :title="props.selectData.title"
    :item-list="selectData.items"
    is-required
    @select="onSelect"
  />
</template>
