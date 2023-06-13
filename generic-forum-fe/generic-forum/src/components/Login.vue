<script>
import NavBar from './UI/NavBar.vue'
import ForumPreview from './ForumItems/ForumPreview.vue'
import axios from 'axios'
export default {
  name: 'login',
  data() {
    return {
      emailAddress: '',
      password: ''
    }
  },
  props: {},
  components: {
    NavBar
  },
  mounted() {
    console.log(this.$store.getters.currentUser)
    console.log(this.$store.state)
    // this.getUserState()
  },
  computed: {
    getUserState(){
    console.log(this.$store.state)
    }
  },
  methods: {
    async loginUser() {
      const loginJson = {
        emailAddress: emailAddress.value,
        password: password.value
      }
      const loginAttempt = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(loginJson),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((data) => data.json())
        .then((_loginAttempt) => {
          console.log(_loginAttempt)
          this.$store.commit({ type: 'updateCurrentUser', _loginAttempt })
          console.log(this.$store.getters.currentUser)
        })
      // window.localStorage.setItem(
      //   'userData',
      //   JSON.stringify({
      //     loggedIn: loginAttempt.loginResult,
      //     userId: loginAttempt.userId,
      //     username: loginAttempt.username
      //   })
      //)

      // ability({ userId: loginAttempt.userId })
      this.$router.go()
    }
  }
}
</script>

<template>
  <div>
    <NavBar />
    <div id="userloginForm">
      <label for="emailAddress">Email address</label>
      <input type="text" id="emailAddress" v-model="emailAddress" />
      <label for="password">Password</label>
      <input type="text" id="password" v-model="password" />
      <button v-on:click="loginUser">Create new forum</button>
    </div>
  </div>
</template>

<style>
#userloginForm {
  display: flex;
  flex-direction: column;
}
</style>
<!-- const loginAttempt = await fetch('http://localhost:3001/users/login', {
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify(loginJson),
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
})
console.log(loginAttempt.json())
} -->
