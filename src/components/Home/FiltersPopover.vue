<template>
  <div class="popover relative d-flex align-i-center justify-center">
    <div class="arrow-up absolute"></div>
    <div class="popover__content d-flex">
      <BaseDropdown
        menu-title="AUTOREFRESH"
        :items="listRefresh"
        :value="autoRefreshPer"
        :multiple="false"
        @onChange="onChangeAutoRefresh"
      />
      <BaseDropdown
        menu-title="ORDER"
        :items="listOrders"
        :value="payload.order_by"
        :multiple="false"
        @onChange="(val) => onChangeOption(val, 'order_by')"
      />
      <BaseDropdown
        menu-title="LANGUAGES"
        :items="listLanguages"
        :value="payload.languages"
        :has-all-toggle="true"
        @onChange="(val) => onChangeOption(val, 'languages')"
      />
      <base-button
        height="40px"
        width="172px"
        button-type="primary"
        class="reset-button"
        @click="onReset"
      >
        <span class="popover__reset">RESET</span>
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseDropdown from "@/components/shared/BaseDropdown";
import BaseButton from "@/components/shared/BaseButton.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FiltersPopover",
  components: {
    BaseDropdown,
    BaseButton,
  },
  data() {
    return {
      listLanguages: [
        {
          title: "English",
          id: "en",
        },
        {
          title: "German",
          id: "de",
        },
        {
          title: "Chinese",
          id: "zh",
        },
        {
          title: "Italian",
          id: "it",
        },
      ],
      listOrders: [
        {
          title: "Top Rated",
          id: "top",
        },
        {
          title: "Latest",
          id: "latest",
        },
        {
          title: "Most Read",
          id: "read",
        },
        {
          title: "Popular",
          id: "retweeted",
        },
      ],
      listRefresh: [
        { title: "10sec", id: "10sec" },
        { title: "30sec", id: "30sec" },
        { title: "1min", id: "1min" },
        { title: "10min", id: "10min" },
      ],
      payload: {
        languages: "all",
        order_by: "top",
        limit: "20",
      },
      pageToken: null,
      autoRefreshPer: "1min",
      interval: null,
    };
  },
  computed: {
    ...mapGetters("stories", ["storiesData"]),
  },
  methods: {
    ...mapActions("stories", ["getStories"]),
    onChangeOption(data, field) {
      if (Array.isArray(data)) {
        this.payload[field] = data.join(", ");
      } else this.payload[field] = data;
    },
    onChangeAutoRefresh(data) {
      this.autoRefreshPer = data;
      const ms = this.autoRefreshPer.includes("sec")
        ? +this.autoRefreshPer.replace("sec", "") * 1000
        : +this.autoRefreshPer.replace("min", "") * 60000;
      clearInterval(this.interval);
      this.interval = setInterval(this.refetchData, ms);
    },
    onReset() {
      this.payload = {
        languages: "all",
        order_by: "top",
      };
      this.autoRefreshPer = "1min";
    },
    refetchData() {
      let obj = {
        languages:
          this.payload.languages === "all"
            ? this.listLanguages.map((el) => el.id).join(", ")
            : this.payload.languages,
        order_by: this.payload.order_by,
        limit: 20,
      };
      if (this.storiesData && this.storiesData.next_page_token) {
        obj.next_page = this.storiesData.next_page_token;
      }
      this.getStories(obj);
    },
  },
  watch: {
    payload: {
      deep: true,
      immediate: true,
      handler(v) {
        this.getStories({
          languages:
            v.languages === "all"
              ? this.listLanguages.map((el) => el.id).join(", ")
              : v.languages,
          order_by: v.order_by,
          limit: 20,
        });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.popover {
  margin-top: 16px;
  height: 80px;
  width: 751px;
  border-radius: 3px;
  background: $color--gray;

  &__content {
    gap: 0 5px;
  }
  &__reset {
    font-weight: 600;
  }
}
.arrow-up {
  width: 0;
  height: 0;
  top: -12px;
  left: 150px;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;

  border-bottom: 12px solid $color--gray;
}

@media (max-width: 768px) {
  .popover {
    width: 100%;
  }
  .arrow-up {
    left: 91%;
  }
}

@media (max-width: 425px) {
  .popover {
    height: 200px;
    justify-content: unset !important;
    background: white;
    &__content {
      flex-direction: column;
      gap: 26px;
    }
    .reset-button {
      display: none;
    }
    .arrow-up {
      border-bottom: 12px solid white;
      left: 14%;
    }
  }
}
</style>
