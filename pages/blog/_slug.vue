<template>
  <div class='text-white h-minus-nav overflow-y-scroll w-full xl:max-w-screen-xl px-6'>
    <PageHeader v-if="blog" :title="blog.title" />
    <nuxt-content :document="blog"></nuxt-content>
  </div>
</template>

<script>
import Vue from 'vue'
import { useAsync, useContext } from '@nuxtjs/composition-api';
import { useRouter } from 'vue-router';

import PageHeader from '../../components/PageHeader.vue';
import PageItem from '../../components/PageItem.vue';

export default Vue.extend({
  name: 'BlogPost',
  components: {
    PageHeader,
    PageItem
  },
  setup() {
    const { $content, params } = useContext();
    const blog = useAsync(() => $content('en/blogs', params.value.slug).fetch());

    return { blog };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .page-title {
  color: $primary;
}
</style>