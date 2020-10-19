<template>
  <div class="flex flex-col">
    <span class='px-10 page-title text-white'>{{ title }}</span>
    <span class='px-10 page-subtitle text-white'>{{ subtitle }}</span>
    <span class="mx-10 my-3 divider"></span>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'PageHeader',
  props: {
    title: { type: String },
    subtitle: { type: String },
  },
});
</script>

<style lang="scss">
.page-title {
  font-size: 48px;
  line-height: 60px;
  margin-top: 0.1em;
  font-weight: 500;
}

.page-subtitle {
  font-size: 24px;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>