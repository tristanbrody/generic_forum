<script>
import NavBar from '../UI/NavBar.vue'
export default {
  props: {},
  components: {
    NavBar
  },
  data() {
    return {
      userData: { posts: [] }
    }
  },
  methods: {},
  created() {
    try {
      this.userData = JSON.parse(window.localStorage.getItem('userData') || '')
    } catch (err) {}
  }
}
</script>

<template>
  <div>
    <NavBar />
    <!-- <h2>Posts in Thread</h2>
    <div v-for="post in threadPosts.posts.slice(0, 10)" v-bind:key="post._id">
      <section id="main-section">
        <ThreadPost
          :postText="post.text"
          :postedByUser="post.username"
          :postedByDate="post.postedByDate"
          :postedByUserHref="post.href"
        />
      </section>
    </div>
  </div> -->
  </div>
</template>

<style>
div > h2:hover {
  cursor: default;
}
</style>
