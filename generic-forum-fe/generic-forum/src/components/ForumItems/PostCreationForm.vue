<script>
import VueBasicAlert from 'vue-basic-alert'
export default {
  props: {},
  data() {
    return {
      postText: '',
      forumId: '',
      showAlert: false
    }
  },
  components: {
    VueBasicAlert
  },
  mounted() {
    this.showAlert = !this.$store.getters.currentUser.loggedIn
  },
  methods: {
    validateThreadSubject() {},
    async handleSubmit() {
      if (this.showAlert) {
        console.log('running')
        this.$refs.alert.showAlert(
          'warning', // There are 4 types of alert: success, info, warning, error
          '', // Size of the icon (px)
          'You must be logged in to post'
        )
      } else {
        let forumId = await fetch(
          'http://localhost:3001/forum/0/' + this.$route.params.forumName
        ).then((res) => res.json())
        this.forumId = forumId
        console.log(this.postText)
        const currentUser = this.$store.getters.currentUser
        const newPostJson = {
          text: this.postText,
          postedByUser: currentUser.userId
        }
        console.log(this.forumId.forumId)
        console.log(newPostJson)
        const newPost = await fetch(
          'http://localhost:3001/forum' +
            '/' +
            this.forumId.forumId +
            '/' +
            this.$route.params.threadId,
          {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newPostJson),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
          }
        ).then((data) => {
          console.log(data.json())
        })
        this.$router.go()
      }
    }
  }
}
</script>

<template>
  <div>
    <vue-basic-alert :duration="300" :closeIn="5000" ref="alert" />
    <form @submit.prevent="handleSubmit">
      <!-- <div class="form-control">
        <label for="thread-subject">Thread Subject</label>
        <input
          id="thread-subject"
          name="thread-subject"
          type="text"
          v-model.trim="threadSubject"
          @blur="validateThreadSubject"
        />
        <p v-if="threadSubjectValidity === 'invalid'">Please enter a valid name!</p>
      </div> -->
      <div class="form-control">
        <label for="post-text">Post Message</label>
        <input
          id="post-text"
          name="post-text"
          type="text"
          v-model.trim="postText"
          @blur="validateThreadSubject"
        />
        <!-- <p v-if="initialPostMessageValidity === 'invalid'">Please enter a valid name!</p> -->
      </div>
      <button>Add post</button>
    </form>
  </div>
</template>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}
.form-control {
  margin: 0.5rem 0;
}

.form-control.invalid input {
  border-color: red;
}

.form-control.invalid label {
  color: red;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}
button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
