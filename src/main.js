import './utils/installCompositionApi.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { provide } from '@vue/composition-api'

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'https://album-backend-python.herokuapp.com/graphql'
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
