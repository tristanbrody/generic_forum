import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'
import { createStore } from 'vuex'
import { abilitiesPlugin } from '@casl/vue'
import VuexPersistence from 'vuex-persist'

import { definePostAbility, Post } from './ability'
import { VueCookieNext } from 'https://unpkg.com/vue-cookie-next@1.0.0/dist/vue-cookie-next.esm-bundler.js'

// import './assets/main.css'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const app = createApp(App)
const store = createStore({
  plugins: [vuexLocal.plugin],
  state() {
    return {
      currentUser: {
        loggedIn: false,
        userId: null,
        username: null
      }
    }
  },
  mutations: {
    updateCurrentUser(state, loginAttempt) {
      loginAttempt = loginAttempt._loginAttempt
      console.log(loginAttempt)
      state.currentUser = {
        loggedIn: loginAttempt.loginResult,
        userId: loginAttempt.userId,
        username: loginAttempt.username
      }
      console.log(state.currentUser)
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    }
  }
})
app.use(store)
app.use(VueCookieNext)
app.use(createPinia())
app.use(router)
let _ability = definePostAbility({}, new Post(0))
app.use(abilitiesPlugin, _ability, {
  useGlobalProperties: true
})

app.mount('#app')

export default store
