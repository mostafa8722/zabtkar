import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff4401',
        secondary: '#434750',
        accent: '#f0f0f0',
        white: '#ffffff'
      }
    }
  },
  rtl: true
});
