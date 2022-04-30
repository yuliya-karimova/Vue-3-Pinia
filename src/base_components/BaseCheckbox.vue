<script setup lang="ts">
import { computed } from "vue";

type Props = {
  text: string;
  isChecked?: boolean;
  isRequired?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  isChecked: false,
  isRequired: false,
});
const emit = defineEmits(["input"]);

const isChecked = computed({
  get() {    
    return props.isChecked;
  },
  set(isCheckedValue) {
    emit("input", isCheckedValue);
  },
});
</script>

<template>
  <label class="option">
    <input v-model="isChecked" class="option__checkbox" type="checkbox" />
    <span class="option__text">{{ props.text }}</span>
  </label>
</template>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  background-color: #fff;
  border: 1px $border-style-dark;
  border-radius: $br-medium;
  cursor: pointer;

  &__checkbox {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    width: 12px;
    height: 12px;
    border: 1px $border-style-dark;
    border-radius: $br-small;

    &::before {
      content: "";
      position: absolute;
      display: none;
      top: -3px;
      left: 0;
      width: 14px;
      height: 14px;
      background: no-repeat url("../assets/svg/checkmark.svg");
      background-size: contain;
      transition: $transition;
    }

    &:checked {
      &::before {
        display: block;
      }
    }
  }

  &__text {
    flex-grow: 1;
    text-align: center;
  }
}
</style>
