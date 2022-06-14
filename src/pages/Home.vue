<template>
  <div class="main">
    <div class="main__left">
      <div class="main__left--header">
        <h2 class="main__title mb-4">Watchlist Name</h2>
        <div class="main__actions d-flex">
          <base-button @click="$router.go()">
            <div class="main__actions--content d-flex align-i-center">
              <font-awesome-icon
                class="main__actions--content__icon"
                icon="arrow-rotate-right"
              />
              <div class="ml-2 main__actions--content__text">Refresh</div>
            </div>
          </base-button>
          <base-button
            class="ml-2 filter-button"
            @click="toggleFilters"
            :button-type="isOpenFiltersPopover ? 'filled' : 'secondary'"
          >
            <div class="main-_actions--content d-flex align-i-center">
              <font-awesome-icon
                class="main__actions--content__icon"
                icon="filter"
              />
              <div class="ml-2 main__actions--content__text">Filters</div>
            </div>
          </base-button>
        </div>
      </div>
      <FiltersPopover v-show="isOpenFiltersPopover" />
      <StoriesList />
    </div>
    <div class="main__right"></div>
  </div>
</template>

<script>
import BaseButton from "@/components/shared/BaseButton";
import FiltersPopover from "@/components/Home/FiltersPopover";
import StoriesList from "@/components/Home/StoriesList";

export default {
  name: "HomePage",
  components: {
    BaseButton,
    FiltersPopover,
    StoriesList,
  },
  data() {
    return {
      isOpenFiltersPopover: false,
    };
  },
  methods: {
    toggleFilters() {
      this.isOpenFiltersPopover = !this.isOpenFiltersPopover;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: calc(100vh - 50px);
  background: $color--light-gray;
  display: flex;
  &__left {
    padding: 30px 30px 67px 70px;
    width: 75%;
  }
  &__right {
    margin-top: 9px;
    width: 25%;
    height: calc(100% - 9px);
    background: $color--gray;
  }

  &__actions {
    &--content {
      &__icon {
        font-size: 18px;
        color: $color--primary;
      }
      &__text {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 768px) {
  .main {
    &__right {
      display: none;
    }
    &__left {
      width: 100%;
      padding: 30px 20px;

      &--header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
    }
  }
}

@media (max-width: 425px) {
  .main {
    &__title {
      font-size: 19px;
    }
    &__left {
      &--header {
        flex-direction: column;
      }
    }
    &__actions {
      &--content {
        &__text {
          display: none;
        }
      }
      .filter-button {
        background: transparent;
        border: none;
      }
      button {
        width: 40px !important;
      }
    }
  }
}
</style>
