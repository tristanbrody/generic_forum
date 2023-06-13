import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ForumView from '../views/ForumView.vue'
import ThreadView from '../views/ThreadView.vue'
import UserRegistrationView from '../views/UserRegistrationView.vue'
import Login from '../components/Login.vue'
import UserPage from '../components/ForumItems/UserPage.vue'
import ProfilePage from '../components/ForumItems/ProfilePage.vue'
import store from '../main'

// console.log(import.meta.env.BASE_URL)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/f/:forumName',
      name: 'forum',
      component: ForumView
    },
    {
      path: '/register',
      name: 'userRegistration',
      component: UserRegistrationView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/u/:username',
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/f/:forumName/:threadId',
      name: 'thread',
      component: ThreadView
    },
    {
      path: '/profile/:username',
      name: 'ProfilePage',
      component: ProfilePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // console.log(history)
  let userData = {}
  console.log(store.getters.currentUser)
  if (store.getters.currentUser) {
    userData = store.getters.currentUser
    const loggedIn = userData.loggedIn
    if ((to.name === 'userRegistration' && loggedIn) || (to.name === 'Login' && loggedIn)) {
      router.push('/')
    }
  } else {
    userData.loggedIn = false
    store.commit({ type: 'updateCurrentUser', userData })
  }
  // console.log({ to, from })
  window.localStorage.setItem('currentUrl', to.fullPath)
  let webHistory = JSON.parse(localStorage.getItem('urlHistory'))
  // console.log(webHistory)
  if (!webHistory) {
    webHistory = JSON.stringify({ arr: [from.fullPath] })
    window.localStorage.setItem('urlHistory', webHistory)
  } else {
    const _webHistory = [...webHistory.arr, to.fullPath]
    // console.log(_webHistory)
    window.localStorage.setItem('urlHistory', JSON.stringify({ arr: _webHistory }))
  }
  // console.log(from.fullPath)

  // if (to.name === 'home' && !to.query.hasOwnProperty('loggedIn')) {
  //   to.query.loggedIn = '0'
  // }
})

export default router
