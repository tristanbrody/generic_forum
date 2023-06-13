<script>
import axios from 'axios'
import { definePostAbility } from '../../ability'
import VueBasicAlert from 'vue-basic-alert'

export default {
  data() {
    return {
      forumNameValue: '',
      descriptionValue: '',
      createdByUser: '',
      showAlert: false
      //   forumThreads: []
    }
  },
  components: {
    VueBasicAlert
  },
  mounted() {
    this.showAlert = !this.$store.getters.currentUser.loggedIn
  },
  methods: {
    async createForum() {
      if (this.showAlert || !this.$store.getters.currentUser.loggedIn) {
        console.log('running')
        this.$refs.alert.showAlert(
          'warning', // There are 4 types of alert: success, info, warning, error
          '', // Size of the icon (px)
          'You must be logged in to create a forum'
        )
      } else {
        const forumName = forumNameValue.value
        const forumDescription = descriptionValue.value
        const forumTags = ['']
        try {
          this.userData = this.$store.getters.currentUser
        } catch (err) {}
        // let abilities = definePostAbility(userData.type)

        const newForumJson = {
          forumName,
          forumDescription,
          forumTags,
          createdBy: this.userData.userId
        }
        const newForum = await fetch('http://localhost:3001/forum', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(newForumJson),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })
        console.log(newForum.json())
        this.$router.push({ name: 'home', params: { title: 'test title' } })
      }
    }
  },
  created() {
    // this.createForum()
  }
}
</script>

<template>
  <div>
    <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />

    <div id="forumCreationForm">
      <label for="forumNameValue">Forum Name</label>
      <input class="formInput" type="text" id="forumNameValue" v-model="forumNameValue" />
      <label for="description">Description</label>
      <input class="formInput" type="text" id="descriptionValue" v-model="descriptionValue" />
      <button v-on:click="createForum">Create new forum</button>
    </div>
  </div>
</template>

<style>
button {
  width: 50%;
  align-content: center;
}

input.formInput {
  width: 70%;
}
#forumCreationForm {
  margin: 50;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
