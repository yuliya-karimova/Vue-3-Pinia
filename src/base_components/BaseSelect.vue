<script setup lang="ts">
import { computed } from "vue";
import { SelectItemType } from "../globalTypes";

type Props = {
  title: string;
  itemList: SelectItemType[];
  selectedItem?: string;
  isRequired?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  selectedItem: "",
  isRequired: false,
});
const emit = defineEmits(["select"]);

const selected = computed({
  get() {
    return props.selectedItem;
  },
  set(option) {
    emit("select", option);
  },
});
</script>

<template>
  <div class="select">
    <p class="select__title">{{ props.title }}</p>
    <select v-model="selected" class="select__select">
      <option disabled value="">Выберите один из вариантов</option>
      <option v-for="item in props.itemList" :key="item.title">
        {{ item.title }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.select {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__select {
    padding: 6px;
    font-size: $fs-base;
    border: 1px $border-style-dark;
    border-radius: $br-medium;
  }
}
</style>
