<script>
import ForumCreationForm from './ForumCreationForm.vue'
import ForumPreviewItem from './ForumPreviewItem.vue'
export default {
  components: {
    ForumCreationForm,
    ForumPreviewItem
  },
  data() {
    return {
      forums: []
    }
  },
  methods: {
    async getRecentlyCreatedForums() {
      const recentlyCreatedForums = await fetch('http://localhost:3001/forum', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      }).then((data) => data.json().then((data) => data))
      this.forums = recentlyCreatedForums
    }
  },
  created() {
    this.getRecentlyCreatedForums()
  }
}
</script>

<template>
  <section id="main-section">
    <h2>Recently Created Forums</h2>
    <div v-for="forum in forums.slice(0, 5)" v-bind:key="forum.id">
      <ForumPreviewItem :forumName="forum.forumName" :forumDescription="forum.description" />
    </div>
    <ForumCreationForm />
  </section>
</template>

<style></style>
