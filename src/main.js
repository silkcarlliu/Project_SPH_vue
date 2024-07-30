import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import store from '@/store'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

Vue.config.productionTip = false

import '@/mock/mockServe'
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
