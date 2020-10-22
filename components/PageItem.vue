<template>
  <div class="item-wrapper flex flex-col md:flex-row p-4 mt-4 mb-8">
    <div class="flex flex-col">
      <span class='item-title text-white'>{{ title }}</span>
      <template v-if='isWork || isFilm'>
        <span class='item-description text-white'>{{ description }}</span>
      </template>
      <template v-if='isWork'>
        <span class='item-description text-white'>Built with: {{ builtWith }}</span>
      </template>
      <template v-if='isBlog || isFilm'>
        <span class='item-description text-white'>{{ dateText }}</span>
      </template>
      <template v-if='isBlog'>
        <span class='item-description text-white'>Reading Time: {{ blogReadingTime }} minutes</span>
      </template>
    </div>
    <div class='ml-auto mt-2 md:mt-0 flex flex-row items-center'>
      <slot name="icons"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { computed } from '@nuxtjs/composition-api';
import readingTime from 'reading-time';

export default Vue.extend({
  name: 'PageItem',
  props: {
    type: { type: String },
    title: { type: String },
    description: { type: String },
    builtWith: { type: String },
    date: { type: String },
    url: { type: String },
    github: { type: String },
    text: { type: String },
  },
  setup(props) {
    const isWork = computed(() => props.type === 'work');
    const isBlog = computed(() => props.type === 'blog');
    const isFilm = computed(() => props.type === 'film');
    const dateText = computed(() => (new Date(props.date)).toLocaleDateString());
    const blogReadingTime = computed(() => parseInt(readingTime(props.text)?.minutes));

    return { isWork, isBlog, isFilm, dateText, blogReadingTime };
  },
});
</script>

<style lang="scss">
.item-wrapper {
  border: 1px solid $accent;
  border-radius: 2px;

  &:hover {
    .item-title {
      font-weight: 500;
    }
  }
}

.item-title {
  font-size: 32px;
  color: $primary;
}

.item-description {
  font-size: 22px;
}
</style>