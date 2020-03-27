import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        clearColor: '#e1dfd9',
        darkColor: '#1a1d1f',
        darkBlue: '#1e6c93',
        otherBlue: '#6327eb',
        brownColor: '#baa284',
        whiteColor: '#fbf8f2',
        greyColor: '#bab9b5',
      },
    },
  },
});
