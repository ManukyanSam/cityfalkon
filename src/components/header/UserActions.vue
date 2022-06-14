<template>
  <div class="actions relative" v-click-outside="closeDropdown">
    <div
      class="actions__activator d-flex align-i-center pointer"
      @click="toggleDropdown"
    >
      <img
        src="@/assets/images/icons/user-icon.png"
        alt="Avatar"
        width="35"
        height="35"
        class="mr-1"
      />
      <font-awesome-icon
        class="actions__activator--icon"
        :class="{ 'actions__activator--rotated': isOpenDropdown }"
        icon="caret-down"
      />
    </div>
    <div class="actions__menu absolute" v-if="isOpenDropdown">
      <div
        v-for="(item, index) in dropdownActions"
        :key="`dropdown_action-${index}`"
        :class="{ 'mb-2': index === dropdownActions.length - 1 }"
      >
        <router-link :to="item.route" class="actions__menu--item">
          {{ item.title }}
        </router-link>
        <hr
          class="divider mt-2 mb-2"
          v-if="index !== dropdownActions.length - 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserActions",
  data() {
    return {
      isOpenDropdown: false,
      dropdownActions: [
        { title: "My Profile", route: "/profile" },
        { title: "Log Out", route: "/login" },
        { title: "Notifications", route: "/notifications" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
    closeDropdown() {
      this.isOpenDropdown = false;
    },
  },
};
</script>

<style scoped lang="scss">
.actions {
  user-select: none;
  &__activator {
    &--rotated {
      transform: rotate(180deg);
    }
    &--icon {
      font-size: 10px;
    }
  }

  &__menu {
    width: 100px;
    padding: 10px 0 0 0;
    background: white;
    right: 0;
    top: 38px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    &--item {
      font-size: 14px;
      color: $color--dark-gray;
      font-weight: 600;
      text-decoration: none;
      padding: 0 8px;
      transition: 0.2s;

      &:hover {
        color: $color--primary;
      }
    }
    .divider {
      width: 100%;
      height: 1px;
      border: none;
      border-bottom: 1px solid #e6e7eb;
    }
  }
}
</style>
