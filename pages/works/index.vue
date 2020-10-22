<template>
  <div class="h-minus-nav overflow-y-scroll sm:w-11/12 xl:max-w-screen-xl px-6">
    <PageHeader title="works" subtitle="welcome to my talk space" />
    <PageItem
      type='work'
      v-for="work in works"
      v-bind="work"
      :key="work.title"
     >
      <template v-slot:icons>
        <span v-if="work.url" class='icon-wrapper text-white'>
          <a :href="work.url" :name="`${work.title} | URL`" target="_blank"><fa :icon="['fas', 'globe-americas']" /></a>
        </span>
        <span v-if="work.github" class='icon-wrapper text-white'>
          <a :href="work.github" :name="`${work.title} | Github`" target="_blank"><fa :icon="['fab', 'github']" /></a>
        </span>
      </template>
    </PageItem>
  </div>
</template>

<script>
import Vue from 'vue'
import { useAsync, useContext } from '@nuxtjs/composition-api';

import PageHeader from '../../components/PageHeader.vue';
import PageItem from '../../components/PageItem.vue';

export default Vue.extend({
  name: 'Works',
  components: {
    PageHeader,
    PageItem
  },
  setup() {
    const { $content } = useContext();
    const works = useAsync(() => $content('en/works').sortBy('date', 'desc').fetch());

    return { works };
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