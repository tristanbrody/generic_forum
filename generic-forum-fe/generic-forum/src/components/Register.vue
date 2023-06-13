<script>
import NavBar from './UI/NavBar.vue'
import axios from 'axios'
export default {
  name: 'Register',
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
  methods: {
    async registerUser() {
      const registrationJson = {
        username: emailAddress.value,
        emailAddress: emailAddress.value,
        newPassword: password.value
      }
      const registrationAttempt = await fetch('http://localhost:3001/users', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(registrationJson),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then((data) => data.json())
      console.log(registrationAttempt)
      this.$store.commit({
        type: 'updateCurrentUser',
        loginAttempt: {
          loggedIn: registrationAttempt.userCreated,
          userId: registrationAttempt.newUserId,
          username: registrationAttempt.username
        }
      })
      this.$router.go()
    }
  }
}
</script>

<template>
  <div>
    <NavBar />
    <div id="userRegistrationForm">
      <label for="emailAddress">Email address</label>
      <input type="text" id="emailAddress" v-model="emailAddress" />
      <label for="password">Password</label>
      <input type="text" id="password" v-model="password" />
      <button @click.stop.prevent="registerUser">Create new forum</button>
    </div>
  </div>
</template>

<style>
#userRegistrationForm {
  display: flex;
  flex-direction: column;
}
</style>
