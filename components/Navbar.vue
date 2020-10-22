<template>
  <div class="w-full flex flex-row items-center h-60">
    <div>
      <NuxtLink to="/" @click="setSelectedPage('home')"><span class="max-h text-32 text-primary px-5">s<span class="text-accent">/</span>h</span></NuxtLink>
    </div>
    <div class="ml-auto">
      <template v-if="!isSmall">
        <ul class="nav-list text-24 text-primary">
          <NuxtLink to="/works" @click="setSelectedPage('works')"><li :class="{'selected': selectedPage === 'works'}">works</li></NuxtLink>
          <NuxtLink to="/blog" @click="setSelectedPage('blog')"><li :class="{'selected': selectedPage === 'blog'}"><li :class="{'selected': selectedPage === 'blog'}">blog</li></NuxtLink>
          <NuxtLink to="/film" @click="setSelectedPage('film')"><li :class="{'selected': selectedPage === 'film'}"><li :class="{'selected': selectedPage === 'film'}">film</li></NuxtLink>
          <NuxtLink to="/uses" @click="setSelectedPage('uses')"><li :class="{'selected': selectedPage === 'uses'}"><li :class="{'selected': selectedPage === 'uses'}">uses</li></NuxtLink>
        </ul>
      </template>
      <template v-else>
        <div class='icon-wrapper'>
          <fa :icon="menuIcon" @click="handleBurgerClick" class='icon' />
        </div>
      </template>
      <template v-if="isSmall && isExpanded">
        <div class='mobile-menu' v-show='isExpanded'>
          <div>
            <NuxtLink to="/works" @click.native="setSelectedPage('works')"><span :class="{'selected': selectedPage === 'works'}">works</span></NuxtLink>
          </div>
          <div>
            <NuxtLink to="/blog" @click.native="setSelectedPage('blog')"><span :class="{'selected': selectedPage === 'blog'}">blog</span></NuxtLink>
          </div>
          <div>
            <NuxtLink to="/film" @click.native="setSelectedPage('film')"><span :class="{'selected': selectedPage === 'film'}">film</span></NuxtLink>
          </div>
          <div>
            <NuxtLink to="/uses" @click.native="setSelectedPage('uses')"><span :class="{'selected': selectedPage === 'uses'}">uses</span></NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ref, computed, useContext } from '@nuxtjs/composition-api';

export default Vue.extend({
  name: 'Navbar',
  setup() {
    const { $breakpoints } = useContext();
    const isSmall = computed(() => $breakpoints.xs);
    const selectedPage = ref('home');
    const isExpanded = ref(false);
    const menuIcon = computed(() => {
      if (isExpanded.value) return ['fas', 'times'];
      return ['fas', 'hamburger'];
    });
    const setSelectedPage = (page) => {
      setTimeout(() => {
        if (isExpanded.value) isExpanded.value = false;
        selectedPage.value = page;
      }, 150);
    };
    const handleBurgerClick = () => isExpanded.value = !isExpanded.value;

    return { selectedPage, isExpanded, handleBurgerClick, menuIcon, setSelectedPage, isSmall };
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
    text-align: center;

    &:hover {
      font-weight: 500;
    }
  }
}

.icon-wrapper {
  display: flex;
}

.icon {
  margin-right: 20px;
  cursor: pointer;
  min-width: 24px;
  font-size: 24px;
  color: $primary;
}

.mobile-menu {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100vw;
  color: $primary;
  background-color: $bg;
  z-index: 10 !important;

  div {
    width: 100%;
    padding: 6px 20px;
    font-size: 24px;
  }
}
</style>