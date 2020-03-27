import Vue from 'vue'
import './plugins/axios'
import vBlur from 'v-blur'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(vBlur, {
  opacity: 0.2,
  filter: 'blur(1.2px)',
  transition: 'all .3s linear'
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
