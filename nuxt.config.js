import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Integrace',
    htmlAttrs: {
      lang: 'pt-br',
       },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A intergrace e uma empresa  de internet brasileira, com sede em Santos, São Paulo. plataforma de gerencia online, a conectar profissionais da area de engenharia e arquitetura, a prestar serviços por todo brasil, a ferramenta oferece tosos os tipos de serviços desde projetos, laudos, vistorias , reparos em serviços residenciais, prediais e industriais.' },
      
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Poppins:400,700,900&display=swap'
      }
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
    '~/assets/css/style.css',
    '~/assets/css/typography.css',
    
    '~/assets/style/mobile_600.css',
    '~/assets/style/mobile_480.css',
    '~/assets/style/desktop.css',
    '~/assets/style/animations.css',    

    'slick-carousel/slick/slick.css',
    'slick-carousel/slick/slick-theme.css'

  
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/mixins/user',
      '~/plugins/vueSmoothScroll',  
      '~/plugins/Masks',          
      { src: '~/plugins/slick', mode: 'client'},        
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/robots'
  ],
  robots: {
    UserAgent: 'Googlebot',
    Disallow: '/users',
    UserAgent: 'Bingbot',
    Disallow: '/admin'
  },

  optimizedImages: {
    optimizeImages: true
  },
  
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://api.integrace.com.br/api'
  },
  auth: {    
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'meta.token'
          },
          user: {
            url: 'user',
            method: 'get',
            propertyName: 'data'
          }, 
          logout: {
            url: 'logout',
            method: 'post'           
          } 
          }  
        }
      }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#363855',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
