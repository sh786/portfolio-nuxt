<template>
  <div>
    <div class="bg min-h-screen flex flex-col items-center">
      <Navbar />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Navbar,
    Footer,
  },
});
</script>

<style lang="scss">
*:focus {
  outline: none;
}

.h-minus-nav {
  height: calc(100vh - 60px);
}

.bg {
  background-color: $bg;
}

.text-primary {
  color: $primary;
}

.text-accent {
  color: $accent;
}

.text-32 {
  font-size: 32px;
}

.text-24 {
  font-size: 24px;
}

.h-60 {
  height: 60px;
}
</style>
