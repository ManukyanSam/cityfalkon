<template>
  <div class="story-box">
    <div class="d-flex justify-between align-i-center">
      <div class="story-box__left d-flex">
        <div class="story-box__left--image">
          <img
            :src="story.imageUrls ? story.imageUrls[0] : ''"
            alt="image"
            width="70"
          />
        </div>
        <div class="story-box__left--data">
          <a
            class="story-box__left--data__title pointer"
            :href="story.expanded_url"
            target="_blank"
            >{{ story.title }}
            <font-awesome-icon icon="up-right-from-square" />
          </a>
          <div
            class="story-box__left--data__description pt-3"
            :class="{ opened: !isOpenCollapsePanel }"
          >
            {{ story.description }}
          </div>
          <div class="story-box__left--data__source pt-3 d-flex align-i-center">
            <img
              :src="story.domain_cached_logo_url"
              alt="thumbnail"
              width="18"
            />
            <img
              v-if="isTweet"
              src="@/assets/images/icons/twitter-icon.svg"
              alt="T"
              width="18"
              class="ml-2"
            />
            <span class="ml-2">{{ story.domain_name }}</span>
            <span class="ml-5 remaining-hours">{{ publishDate }}</span>
          </div>
          <div
            class="story-box__left--score-mobile"
            :class="getCurrentScoreClass"
          >
            {{ story.score }}
          </div>
        </div>
      </div>
      <div class="story-box__right d-flex align-i-center">
        <div
          class="score d-flex align-i-center justify-center"
          :class="getCurrentScoreClass"
        >
          {{ story.score }}
        </div>
        <font-awesome-icon
          @click="toggleCollapse"
          class="story-box__right--chevron pointer"
          :class="{ rotated: !isOpenCollapsePanel }"
          icon="chevron-down"
        />
      </div>
    </div>
    <div
      class="story-box__actions d-flex justify-end align-i-center"
      v-if="!isOpenCollapsePanel"
    >
      <base-button button-type="text" width="50" height="20">
        <div class="story-box__actions--icon d-flex align-i-center">
          <font-awesome-icon icon="thumbs-up" />
          <span class="story-box__actions--text ml-2">Like</span>
        </div>
      </base-button>
      <base-button button-type="text" width="50" height="20">
        <div class="story-box__actions--icon d-flex align-i-center">
          <font-awesome-icon icon="thumbs-up" />
          <span class="story-box__actions--text ml-2">Dislike</span>
        </div>
      </base-button>
      <base-button button-type="text" width="50" height="20">
        <div class="story-box__actions--icon d-flex align-i-center">
          <font-awesome-icon icon="bookmark" />
          <span class="story-box__actions--text ml-2">Bookmark</span>
        </div>
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/shared/BaseButton";
export default {
  name: "StoryBox",
  props: {
    story: Object,
  },
  components: {
    BaseButton,
  },
  data() {
    return {
      isOpenCollapsePanel: true,
    };
  },
  computed: {
    publishDate() {
      const hours = Math.round(this.story.publishTimeDiff / 1000);
      const daysCount = hours / 24;
      const hoursCount = hours % 24;
      if (daysCount >= 1 && hoursCount >= 1) {
        return `${Math.round(daysCount)}d ${Math.round(hoursCount)}h`;
      } else if (daysCount >= 1 && hoursCount < 1) {
        return `${Math.round(daysCount)}d`;
      } else {
        return `${Math.round(hoursCount)}h`;
      }
    },
    isTweet() {
      return (
        this.story.category !== "op" &&
        this.story.category !== "mp" &&
        this.story.category !== "r"
      );
    },
    getCurrentScoreClass() {
      if (this.story.score >= 50) {
        return "good";
      } else if (this.story.score > 15 && this.story.score <= 49) {
        return "normal";
      } else return "bad";
    },
  },
  methods: {
    toggleCollapse() {
      this.isOpenCollapsePanel = !this.isOpenCollapsePanel;
    },
  },
};
</script>

<style scoped lang="scss">
.story-box {
  width: 100%;
  min-height: 75px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  background: white;
  margin-bottom: 7px;
  &__left {
    gap: 0 20px;
    &--image img {
      width: 70px;
      height: 73px;
      object-fit: cover;
      max-height: 100px;
    }
    &--data {
      padding: 12px 0;
      &__title {
        font-size: 16px;
        color: black;
        text-decoration: none;
        display: flex;
        align-items: center;
        svg {
          display: none;
          margin-left: 12px;
          color: $color--dark-gray;
          font-size: 12px;
        }
        &:hover {
          text-decoration: underline;
          svg {
            display: block;
          }
        }
      }
      &__description {
        display: none;
        transition: 0.4s;
        &.opened {
          display: block;
        }
      }
      &__source {
        span {
          color: $color--dark-gray;
          font-size: 12px;
        }
      }
    }
    &--score-mobile {
      display: none;
    }
  }
  &__right {
    padding-right: 20px;
    gap: 0 20px;
    .score {
      width: 40px;
      height: 30px;
      border-radius: 5px;

      &.bad {
        border: 1px solid #ef6c00;
        color: #ef6c00;
      }
      &.normal {
        border: 1px solid #ffb300;
        color: #ffb300;
      }
      &.good {
        border: 1px solid #4eb495;
        color: #4eb495;
      }
    }
    &--chevron {
      color: #8c8c8c;
      transition: 0.2s;
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
  &__actions {
    height: 40px;
    box-shadow: 0 -1px 0 0 #e7e7e7;
    padding-right: 20px;
    gap: 0 45px;

    &--icon {
      font-size: 18px;
      &:hover {
        svg,
        span {
          color: $color--primary;
        }
      }
    }
    &--text {
      color: #292929;
      font-size: 14px;
    }
  }
}
@media (max-width: 425px) {
  .story-box {
    min-height: 156px;
    &__left {
      &--image img {
        width: 52px;
        height: 156px;
      }
      &--score-mobile {
        display: block;
        padding-top: 15px;
        font-weight: bold;

        &.bad {
          color: #ef6c00;
        }
        &.normal {
          color: #ffb300;
        }
        &.good {
          color: #4eb495;
        }
      }
    }
    .score {
      display: none;
    }
    .remaining-hours {
      margin-left: 10px;
    }
    &__actions {
      gap: 0 24px;
      &--icon {
        justify-content: center;
        flex-direction: column;
      }
      &--text {
        margin-left: 0;
      }
    }
  }
}
</style>
