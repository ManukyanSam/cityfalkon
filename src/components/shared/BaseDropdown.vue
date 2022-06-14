<template>
  <div class="relative pointer" v-click-outside="closeMenu">
    <div
      class="base-dropdown d-flex align-i-center justify-between"
      @click="toggleMenu"
    >
      <div>
        <span class="base-dropdown__label">{{ dropdownLabel }}</span>
        <div class="base-dropdown__sublabel">{{ menuTitle }}</div>
      </div>
      <div>
        <font-awesome-icon
          class="base-dropdown__arrow"
          :class="{ rotated: isOpenMenu }"
          icon="chevron-down"
        />
      </div>
    </div>
    <div class="base-dropdown__menu absolute" v-if="isOpenMenu">
      <div class="base-dropdown__menu--title">{{ menuTitle }}:</div>
      <div class="base-dropdown__menu--content">
        <div class="base-dropdown__menu--content__item">
          <div v-if="hasAllToggle" class="d-flex align-i-center">
            <input type="checkbox" v-model="isSelectedAllItems" />
            <span class="ml-2">Select / Unselect All</span>
          </div>
        </div>
        <div
          v-for="(item, index) in items"
          :key="`item_${index}`"
          class="base-dropdown__menu--content__item"
        >
          <div class="d-flex align-i-center">
            <input
              type="checkbox"
              v-model="checkedItems"
              :disabled="checkedItems.length === 1 && value === item.id"
              :value="item.id"
            />
            <span class="ml-2">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <modal :is-open="isOpenMobileFilters" @close="isOpenMobileFilters = false">
      <template v-slot:title> {{ menuTitle }}: </template>
      <template v-slot:content>
        <div class="base-dropdown__menu--content__item">
          <div v-if="hasAllToggle" class="d-flex align-i-center">
            <input type="checkbox" v-model="isSelectedAllItems" />
            <span class="ml-2">Select / Unselect All</span>
          </div>
        </div>
        <div
          v-for="(item, index) in items"
          :key="`item_${index}`"
          class="base-dropdown__menu--content__item"
        >
          <div class="d-flex align-i-center">
            <input
              type="checkbox"
              v-model="checkedItems"
              :disabled="checkedItems.length === 1 && value === item.id"
              :value="item.id"
            />
            <span class="ml-2">{{ item.title }}</span>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/shared/Modal";
export default {
  name: "BaseDropdown",
  components: {
    Modal,
  },
  props: {
    menuTitle: String,
    items: Array,
    value: String,
    hasAllToggle: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpenMenu: false,
      checkedItems: [],
      isSelectedAllItems: false,
      isOpenMobileFilters: false,
    };
  },
  computed: {
    dropdownLabel() {
      return this.value === "all"
        ? `ALL ${this.menuTitle}`.toLowerCase()
        : this.value;
    },
  },
  methods: {
    toggleMenu() {
      if (this.isMobile) {
        this.isOpenMobileFilters = true;
        return;
      }
      this.isOpenMenu = !this.isOpenMenu;
    },
    closeMenu() {
      this.isOpenMenu = false;
    },
    resizeHandler() {
      if (window.innerWidth <= 425) {
        this.isMobile = true;
      } else this.isMobile = false;
    },
  },
  watch: {
    checkedItems(v) {
      if (!this.multiple) {
        this.$emit("onChange", v[v.length - 1]);
        return;
      }
      if (v.length === this.items.length) {
        this.$emit("onChange", "all");
        return;
      } else {
        this.isSelectedAllItems = false;
      }
      this.$emit("onChange", v);
    },
    isSelectedAllItems(v) {
      if (v) {
        this.checkedItems = this.items.map((el) => el.id);
      } else {
        if (this.checkedItems.length === this.items.length) {
          this.checkedItems = this.checkedItems.splice(0, 1);
        }
      }
    },
    value(v) {
      if (v === "all") {
        this.isSelectedAllItems = true;
      } else if (!this.multiple) {
        this.checkedItems = this.checkedItems.slice(-1);
      }
    },
  },
  created() {
    if (this.value === "all") {
      this.isSelectedAllItems = true;
    } else this.checkedItems = [this.value];
    this.resizeHandler();
  },
  mounted() {
    window.onresize = () => this.resizeHandler();
  },
};
</script>

<style scoped lang="scss">
.base-dropdown {
  border-radius: 3px;
  width: 172px;
  height: 40px;
  background: white;
  padding: 0 10px;
  &__arrow {
    color: #8c8c8c;
    font-size: 12px;
    &.rotated {
      transform: rotate(180deg);
    }
  }
  &__label {
    text-transform: capitalize;
    color: #292929;
    font-weight: bold;
    font-size: 13px;
  }
  &__sublabel {
    font-size: 10px;
    color: #666666;
    letter-spacing: 0.5px;
  }
  &__menu {
    width: 188px;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2);
    background: white;
    padding: 20px;
    top: 46px;
    z-index: 999;
    &--title {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    &--content {
      &__item {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: #292929;
        }
        input,
        input:disabled {
          width: 18px;
          height: 18px;
          accent-color: $color--primary !important;
        }
      }
    }
  }
}

@media (max-width: 425px) {
  .base-dropdown {
    &__arrow {
      display: none;
    }
    &__label {
      font-size: 14px;
    }
    &__sublabel {
      font-size: 12px;
    }
  }
}
</style>
