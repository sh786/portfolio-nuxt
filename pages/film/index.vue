<template>
  <div class="h-minus-nav overflow-y-scroll sm:w-11/12 xl:max-w-screen-xl px-6">
    <PageHeader title="film" subtitle="checkout my drone footage" />
    <PageItem
      type='film'
      v-for="film in films"
      v-bind="film"
      :key="film.title"
     >
      <template v-slot:icons>
        <span class='icon-wrapper text-white'>
          <a :href="film.url" :name="`${film.title} | URL`" target="_blank"><fa :icon="['fab', 'youtube']" /></a>
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
  name: 'Film',
  components: {
    PageHeader,
    PageItem
  },
  setup() {
    const { $content } = useContext();
    const films = useAsync(() => $content('en/films').sortBy('date', 'desc').fetch());

    return { films };
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