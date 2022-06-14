<template>
  <button
    class="base-button pointer d-flex justify-center align-i-center"
    :class="buttonType"
    :type="nativeType"
    :style="{ width: width, height: height }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    buttonType: {
      type: String,
      default: "secondary",
    },
    nativeType: {
      type: String,
      default: "button",
    },
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "40px",
    },
  },
};
</script>

<style scoped lang="scss">
.base-button {
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  transition: 0.2s;
  outline: none;
  &.secondary {
    background: white;

    &:hover {
      background: $color--gray;
      border-color: transparent;
    }
  }
  &.filled {
    border-color: transparent;
    background: $color--gray;
  }
  &.primary {
    background: $color--primary;
    border-color: transparent;
    color: white;
  }
  &.text {
    background: none;
    border: none;
  }
}
</style>
