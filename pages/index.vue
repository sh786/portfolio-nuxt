<template>
  <div class="h-minus-nav flex flex-col items-center justify-center">
    <div class='main-wrapper'>
      <h1 class="text-primary cover-title">sam <span class="text-accent">/</span> hamburger</h1>
      <p id="typed-text"></p>
    </div>
    <client-only>
        <Particles
          color="#00ffff"
          :particles-number="60"
          shapeType="image"
          :particle-size="9"
          movement-direction="top"
          lines-color="#dedede"
          :line-linked="false"
          :move-speed="0.75"
        />
      </client-only>
  </div>
</template>

<script lang="ts">
/// <reference path="../global.d.ts" />
import Vue from 'vue'
import { onMounted } from '@nuxtjs/composition-api';
import TypeIt from 'typeit';

import Particles from '../components/Particles.vue';

export default Vue.extend({
  name: 'Home',
  components: { Particles },
  setup() {
    onMounted(() => {
      new TypeIt("#typed-text", { speed: 50 })
      .type("welcome to the moon")
      .delete(8)
      .type("my site")
      .break()
      .pause(200)
      .type("feel free to checkout my...")
      .break()
      .pause(200)
      .type("<a href='/works/'>recent works</a>")
      .break()
      .pause(200)
      .type("or")
      .break()
      .pause(200)
      .type("<a href='/blog/'>some posts</a>")
      .break()
      .pause(200)
      .type("or maybe even")
      .break()
      .pause(200)
      .type("<a href='/film/'>a little film</a>")
      .go();
    });
  },
});
</script>

<style lang="scss">
.main-wrapper {
  height: 348px;
  z-index: 8 !important;
}

.cover-title {
  font-size: 64px;

  @media screen and (max-width: 639px) {
    font-size: 44px;
  }
}

#typed-text {
  color: $white;
  font-size: 24px;
  width: 100%;
  text-align: center;
  z-index: 10 !important;

  a {
    text-decoration: underline;
    color: $primary;
    z-index: 10 !important;
  }
}

div[id^="particles-instance-"] {
  height: calc(100vh - 60px) !important;
  width: 100vw !important;
  position: fixed !important;
  top: 60px !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: rgba($color: $bg, $alpha: 0.1);
  opacity: 0.5;
  z-index: 0 !important;
}
</style>
