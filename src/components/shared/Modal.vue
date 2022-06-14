<template>
  <div class="overlay" v-if="isOpenModal" @click="closeModal">
    <div class="overlay__content relative" @click.stop>
      <div class="pointer overlay__close absolute" @click="closeModal">
        <font-awesome-icon icon="xmark" />
      </div>
      <div class="overlay__title">
        <slot name="title"></slot>
      </div>
      <div class="overlay__items">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpenModal: false,
    };
  },
  watch: {
    isOpen(v) {
      this.isOpenModal = v;
    },
  },
  methods: {
    closeModal() {
      this.isOpenModal = false;
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 0 15px;
  display: grid;
  align-items: center;
  place-items: center;
  &__title {
    font-size: 13px;
    font-weight: bold;
    color: #292929;
  }
  &__items {
    padding-top: 23px;
  }
  &__content {
    width: 100%;
    padding: 20px;
    background: white;
    min-height: 249px;
    opacity: 1;
  }
  &__close {
    top: 15px;
    right: 15px;
    &:deep(svg) {
      font-size: 20px;
      color: #8c8c8c;
    }
  }
}
</style>
