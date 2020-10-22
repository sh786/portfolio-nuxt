const createSitemapRoutes = async () => {
  const routes = [];
  const { $content } = require('@nuxt/content')
  const works = await $content('works').fetch();
  for (const work of works) {
    routes.push(`works/${work.slug}`);
  }
  const blogs = await $content('blogs').fetch();
  for (const blog of blogs) {
    routes.push(`blog/${blog.slug}`);
  }
  return routes;
};

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Sam Hamburger | Portfolio and Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/port-logo.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['./assets/_variables.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['faGlobeAmericas', 'faHamburger', 'faTimes'],
      brands: ['faGithub', 'faYoutube'],
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/style-resources',
    'nuxt-breakpoints',
  ],

  styleResources: {
    scss: ['~/assets/_variables.scss'],
  },

  breakpoints: {
    // default options
    sm: 680,
    options: {
      polyfill: true,
      throttle: 200
    }
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {
    // choose to suit your project
    interval: 1000,
  },
  sitemap: {
    hostname: 'https://my-domain-name.com',
    gzip: true,
    routes: createSitemapRoutes,
  },
};
