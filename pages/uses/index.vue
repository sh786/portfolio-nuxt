<template>
  <div class="h-minus-nav overflow-y-scroll sm:w-11/12 xl:max-w-screen-xl px-6">
    <PageHeader title="uses" subtitle="see what technology I use" />
    <div class='uses-wrapper'>
      <div>
        <span class='section-header'>hardware</span>
        <p>Macbook Pro 16”” 2019, 2.6Ghz 6-Core i7, 16GB DDR4</p> 
        <p>LG 34" Ultrawide Curved WQHD IPS Monitor (34WL75C-B)</p>
        <p>Dell UltraSharp IPS LCD 24-Inch Screen LED-Lit Monitor (U2419H)</p>
        <p>Apple Magic Mouse 2</p>
        <p>Apple Magic Keyoboard</p>
        <p>iPhone X</p>
        <p>Nulaxy Portable Laptop Stand</p>
        <p>DJI Mavic Pro Drone</p>
      </div>
      <div>
        <span class='section-header'>apps</span>
        <div class='two-col flex'>
          <div>
            <p>Microsoft Virtual Studio Code</p> 
            <p>Google Chrome Canary</p>
            <p>Firefox Developer Edition</p>
            <p>Figma</p>
            <p>Notion</p>
            <p>Spotify</p>
            <p>Rectangle</p>
          </div>
          <div>
            <p>Fiddler</p> 
            <p>Insomnia</p>
            <p>Itsycal</p>
            <p>Alfred</p>
            <p>Slack</p>
            <p>Zeplin</p>
            <p>Jira</p>
          </div>
        </div>
      </div>
      <div>
        <span class='section-header'>languages <span class='text-accent'>/</span> libraries</span>
        <div class='two-col flex'>
          <div>
            <p>JavaScript</p> 
            <p>React <span class='text-accent'>/</span> Redux <span class='text-accent'>/</span> Recoil</p>
            <p>React Native</p>
            <p>Gatsby</p>
            <p>Vue <span class='text-accent'>/</span> Nuxt</p>
            <p>GraphQL <span class='text-accent'>/</span> Apollo</p>
          </div>
          <div>
            <p>Node.js</p> 
            <p>AWS Amplify</p>
            <p>D3.js</p>
            <p>SQL</p>
            <p>Python</p>
            <p>Java</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import PageHeader from '../../components/PageHeader.vue';

export default Vue.extend({
  name: 'Uses',
  components: {
    PageHeader,
  },
});
</script>

<style lang="scss">
.uses-wrapper {
  > div {
    margin-bottom: 20px;
  }

  .section-header {
    color: $primary;
    text-decoration: underline;
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: $white;
  }

  .two-col {
    div:nth-of-type(2) {
      margin-left: 40px;
    }
  }
}
</style>