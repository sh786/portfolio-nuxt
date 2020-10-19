<template>
  <div class="h-minus-nav overflow-y-scroll sm:w-11/12 xl:max-w-screen-xl px-6">
    <PageHeader title="blog" subtitle="welcome to my talk space" />
    <template v-for="blog in blogs">
      <NuxtLink :to="`/blog/${blog.slug}`">
        <PageItem
          type='blog'
          v-bind="blog"
          :key="blog.title"
        >
          <template v-slot:icons>
          </template>
        </PageItem>
      </NuxtLink>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { useAsync, useContext } from '@nuxtjs/composition-api';

import PageHeader from '../../components/PageHeader.vue';
import PageItem from '../../components/PageItem.vue';

export default Vue.extend({
  name: 'Blog',
  components: {
    PageHeader,
    PageItem
  },
  setup() {
    const { $content } = useContext();
    const blogs = useAsync(() => $content('en/blogs', { text: true }).sortBy('date', 'desc').fetch());

    return { blogs };
  },
});
</script>

<style lang="scss">
.icon-wrapper {
  font-size: 1.5em;
  margin: 0 12px;
  &:hover {
    color: $primary;
  }
}
</style>