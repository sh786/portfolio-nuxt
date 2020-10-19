<template>
  <div class="item-wrapper flex flex-row p-4 mx-10 mt-4 mb-8">
    <div class="flex flex-col">
      <span class='item-title text-white'>{{ title }}</span>
      <span class='item-description text-white'>{{ description }}</span>
      <span class='item-description text-white' v-if="builtWith">Built with: {{ builtWith }}</span>
    </div>
    <div class='ml-auto flex flex-row items-center'>
      <slot name="icons"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'PageItem',
  props: {
    title: { type: String },
    description: { type: String },
    builtWith: { type: String },
    url: { type: String },
    github: { type: String },
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