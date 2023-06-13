<script>
export default {
  props: {
    showLoginOptions: Boolean
  },
  created() {
    try {
      this.currentUrl = localStorage.getItem('currentUrl')
      this.urlHistory = JSON.parse(localStorage.getItem('urlHistory'))
      this.userData = this.$store.getters.currentUser
    } catch (err) {}
  },
  data() {
    return {
      urlHistory: [],
      currentUrl: {},
      previousPath: [],
      userData: {
        username: '',
        loggedIn: false
      },
      toggleLogin: 0
    }
  },
  methods: {
    async logout() {
      this.$store.commit({
        type: 'updateCurrentUser',
        _loginAttempt: {
          loggedIn: false,
          userId: null,
          username: null
        }
      })
      const logout = await fetch('http://localhost:3001/users/logout', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({}),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      this.$router.go('')
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <div id="loginDisplay" :key="toggleLogin" v-if="!this.userData.loggedIn">
        <RouterLink to="/register">Sign Up</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </div>
      <div v-else>
        Logged In As {{ userData.username }}
        <a @click="logout" href="#">Log out</a>
        <RouterLink :to="'/profile' + '/' + userData.username">My Profile</RouterLink>
      </div>
    </nav>
    <div>
      Current Path: <RouterLink :to="currentUrl">{{ currentUrl }}</RouterLink>
      <li v-for="(item, index) in urlHistory.arr.slice(1).slice(-5)" v-bind:key="index">
        <a :href="`http://localhost:5173${item}`">{{ item }}</a>
      </li>
    </div>
  </div>
</template>

<style>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#loginDisplay {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

div > * {
  margin: 5px;
}
</style>
