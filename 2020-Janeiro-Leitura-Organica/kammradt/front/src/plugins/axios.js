import Vue from 'vue'
import VueAxios from 'vue-plugin-axios'
import axios from 'axios'
 
Vue.use(VueAxios, {
  axios, 
  config: {
    baseURL: 'https://leitura-organica-api.herokuapp.com/',
  },
  interceptors: {
    beforeRequest (config) {
      let token = localStorage.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})