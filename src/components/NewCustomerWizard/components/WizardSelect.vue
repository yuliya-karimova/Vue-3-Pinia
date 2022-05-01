<script setup lang="ts">
import { SelectType } from "../../../globalTypes";
import BaseSelect from "../../../base_components/BaseSelect.vue";

type Props = {
  selectData: SelectType;
  selectIndex: number;
};
const props = defineProps<Props>();
const emit = defineEmits(["select"]);

const onSelect = (selectValue: string) => {
  const selectItemData = props.selectData.items.find(
    (item) => item.title === selectValue
  );

  emit("select", selectItemData, props.selectIndex);
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
