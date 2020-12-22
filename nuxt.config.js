const colors = require('vuetify/es5/util/colors').default

module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.5, user-scalable=yes' },
            { name: 'revisit-after', content: '1 hour' },
            { name: 'distribution', content: 'all' },
            { http: 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'expires', content: '1' },
            { name: 'robots', content: 'all' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'images/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'
            },


        ],
        script: [],
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        '@static/css/frontend.css',
        '@static/css/bootstrap.min.css',
        '@static/css/bootstrap-theme.min.css',
        '@static/css/reset.css',        
        '@static/css/base.css',
        '@static/css/tablet.css',
        '@static/css/phone.css',
        '@static/css/small.css',
        '@static/css/printer.css'
    ],
    script: [
        '@static/js/jquery.js',
        '@static/js/bootstrap.bundle.min.js',
    ],
    /*
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/vuelidate'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: `http://${process.env.BACKEND_SERVER}:${process.env.BACKEND_PORT}/api`,
    },

    auth: {
        strategies: {
          local: {
            endpoints: {
              login: { url: '/usuario/login', method: 'post' , propertyName: 'tokenReturn'},
              user: { url: '/usuario/list', method: 'get', propertyName: 'data' },
              logout: false
            }
          },
        },
        redirect: {
            login: '/',
            logout: '/login',
            user: '/profile',
            callback:'/'
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
                    primary: '#3E6DC6',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107'
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
        extend(config, ctx) {
            if (ctx.isDev) {
                config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
            }
        }
    }
};