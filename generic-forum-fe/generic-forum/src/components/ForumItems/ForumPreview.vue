<script>
import axios from 'axios'

export default {
  data() {
    return {
      forums: []
    }
  },
  methods: {
    async getRecentlyCreatedForums() {
      const recentlyCreatedForums = await axios.get('http://localhost:3001/forum', {
        withCredentials: false
      })
      this.forums = recentlyCreatedForums.data
      console.log(recentlyCreatedForums)
    }
  },
  created() {
    this.getRecentlyCreatedForums()
  }
}
</script>

<template>
  <div>
    <h2>Recently Created Forums</h2>
    <div v-for="forum in forums.slice(0, 5)" v-bind:key="forum.id">
      <a :href="'localhost:5173/' + forum.forumName"
        ><h3>Forum name: {{ forum.forumName }}</h3></a
      >
      <h3>Forum description: {{ forum.description }}</h3>
    </div>
  </div>
</template>

<style>
/* nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
} */
</style>
