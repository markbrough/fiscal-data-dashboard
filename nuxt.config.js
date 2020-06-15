const routerBase = process.env.DEPLOY_ENV === 'WITH_SUBFOLDER' ? {
  router: {
    base: '/covid19-liberia/'
  }
} : {}
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'MFDP Fiscal Data Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A dashboard of fiscal data published by the Ministry of Finance and Development Planning.' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@mfdp_lib' },
      { name: 'twitter:title', content: 'MFDP Fiscal Data Dashboard' },
      { name: 'twitter:description', content: "A dashboard of fiscal data published by the Ministry of Finance and Development Planning." },
      { property: 'og:url', content: 'http://fiscaldata.liberiaprojects.org/' },
      { property: 'og:title', content: 'MFDP Fiscal Data Dashboard' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: "A dashboard of fiscal data published by the Ministry of Finance and Development Planning." },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  ...routerBase
}
