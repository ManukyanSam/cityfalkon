<template>
  <div
    class="pt-5 story-box__outer relative"
    @scroll="scrollHandler"
    v-if="storiesData"
  >
    <div v-for="(item, index) in storiesData.stories" :key="`story_${index}`">
      <StoryBox :story="item" />
    </div>
  </div>
</template>

<script>
import StoryBox from "./StoryBox";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "StoriesList",
  components: {
    StoryBox,
  },
  computed: {
    ...mapGetters("stories", ["isLoadingStories", "storiesData", "filterData"]),
  },
  methods: {
    ...mapActions("stories", ["getStories"]),
    scrollHandler(e) {
      if (
        e.target.scrollTop + e.target.clientHeight ===
        e.target.scrollHeight
      ) {
        this.getStories({
          ...this.filterData,
          page_token: this.storiesData.next_page_token,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.overlay-loader {
  width: 100%;
  height: 50px;

  display: grid;
  place-items: center;
  align-items: flex-end;
}
.story-box {
  &__outer {
    height: calc(100% - 66px);
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.loader-small {
  width: 100%;
  bottom: 20px;
}
</style>
