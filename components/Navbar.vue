<template>
  <div class="max-w flex flex-row items-center h-60">
    <div>
      <NuxtLink to="/" @click="setSelectedPage('home')"><span class="max-h text-32 text-primary px-5">s<span class="text-accent">/</span>h</span></NuxtLink>
    </div>
    <div class="ml-auto">
      <ul class="nav-list text-24 text-primary">
        <NuxtLink to="/works" @click="setSelectedPage('works')"><li :class="{'selected': selectedPage === 'works'}">works</li></NuxtLink>
        <NuxtLink to="/blog" @click="setSelectedPage('blog')"><li :class="{'selected': selectedPage === 'works'}"><li :class="{'selected': selectedPage === 'blog'}">blog</li></NuxtLink>
        <NuxtLink to="/film" @click="setSelectedPage('film')"><li :class="{'selected': selectedPage === 'works'}"><li :class="{'selected': selectedPage === 'film'}">film</li></NuxtLink>
        <NuxtLink to="/uses" @click="setSelectedPage('uses')"><li :class="{'selected': selectedPage === 'works'}"><li :class="{'selected': selectedPage === 'uses'}">uses</li></NuxtLink>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@nuxtjs/composition-api';

export default Vue.extend({
  name: 'Navbar',
  setup() {
    const selectedPage = ref('home');
    const setSelectedPage = (page: string) => selectedPage.value = page;

    return { selectedPage };
  },
})
</script>

<style lang='scss'>
.selected {
  color: $accent;
  font-weight: 600 !important;
}

.nav-list {
  display: flex;

  li {
    padding-left: 1em;
    padding-right: 1em;
    cursor: pointer;
    min-width: 110px;

    &:hover {
      font-weight: 500;
    }
  }
}
</style>