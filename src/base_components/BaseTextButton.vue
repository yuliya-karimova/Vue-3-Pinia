<script setup lang="ts">
type Props = {
  isDisabled?: boolean;
  isActive?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isActive: false
});
const emit = defineEmits(["click"]);
const onClick = () => {
  emit("click");
};
</script>

<template>
  <button
    :class="['button', { button_active: props.isActive, button_disabled: props.isDisabled }]"
    :disabled="props.isDisabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.button {
  width: 100%;
  padding: 8px;
  border-radius: $br-medium;
  background-color: $button-inactive;
  color: $light-grey;
  cursor: pointer;

  &_disabled {
    pointer-events: none;
  }

  &_active {
    background-color: $green;
  }
}
</style>
