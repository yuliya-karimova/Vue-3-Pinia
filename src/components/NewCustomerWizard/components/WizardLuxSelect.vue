<script setup lang="ts">
import { SelectType } from "../../../globalTypes";
import BaseSelect from "../../../base_components/BaseSelect.vue";

type Props = {
  selectData: SelectType;
};
const props = defineProps<Props>();
</script>

<template>
  <BaseSelect
    :title="props.selectData.title"
    :selected-item="selectData.items[0].title"
    :item-list="selectData.items"
    :is-required="true"
  />
</template>
