<script>
import axios from 'axios'
import ThreadPreview from './ThreadPreview.vue'
import NavBar from '../UI/NavBar.vue'
export default {
  name: 'ForumCreationForm',
  components: {
    ThreadPreview,
    NavBar
  },
  data() {
    return {
      forumThreads: {},
      isLoading: true
    }
  },
  methods: {
    async getForumData() {
      const getForumId = await axios.get(
        'http://localhost:3001/forum/0/' + this.$route.params.forumName
      )
      const forumData = await fetch('http://localhost:3001/forum' + '/' + getForumId.data.forumId, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      })
        .then((res) => res.json())
        .finally(() => {
          this.isLoading = false
        })

      this.forumThreads = forumData
    }
  },
  created() {
    this.getForumData()
  }
}
</script>

<template>
  <div>
    <!-- <h1>{{ forumThreads.forum[0].forumName }}</h1>
    <h1>{{ forumThreads.forum[0].description }}</h1> -->
    <NavBar />
    <section id="main-section" v-if="!isLoading">
      <h2>Threads in Forum</h2>
      <div v-for="thread in forumThreads.threads" v-bind:key="thread._id">
        <ThreadPreview
          :forumName="forumThreads.forum.forumName"
          :threadId="thread._id"
          :threadSubject="thread.threadSubject"
          :createdAt="thread.createdAt"
        />
      </div>
    </section>
    <section v-if="isLoading">
      <p>
        <i>Loading</i>
      </p>
    </section>
  </div>
</template>

<style>
/* nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
} */
</style>
