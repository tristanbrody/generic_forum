<script>
import ForumHome from '../components//ForumItems/ForumHome.vue'
import ThreadCreationForm from '../components/ForumItems/ThreadCreationForm.vue'
export default {
  data() {
    return {
      forumId: ''
    }
  },
  components: {
    ThreadCreationForm,
    ForumHome
  },
  methods: {
    async _getForumId() {
      let forumId = await fetch(
        'http://localhost:3001/forum/0/' + this.$route.params.forumName
      ).then((data) => data.json())
      console.dir(forumId)
      this.forumId = forumId.forumId
    }
  },
  created() {
    this._getForumId()
  }
}
</script>

<template>
  <main>
    <ForumHome />
    <ThreadCreationForm :forumId="forumId" />
  </main>
</template>
