<script>
import axios from 'axios'
import ThreadPost from './ThreadPost.vue'
import NavBar from '../UI/NavBar.vue'
import PostCreationForm from './PostCreationForm.vue'
import ThreadCreationForm from './ThreadCreationForm.vue'
import { definePostAbility } from '../../ability'
export default {
  props: {},
  components: {
    ThreadPost,
    NavBar,
    ThreadCreationForm,
    PostCreationForm
  },
  data() {
    return {
      forumId: '',
      threadPosts: { posts: [] }
    }
  },
  methods: {
    handleUpdate(post, canEdit) {
      console.log('running111')
      let loggedIn = false
      let userData = {}
      // this.$store.commit({
      //   type: 'updateCurrentUser',
      //   loginAttempt: {
      //     loggedIn: false,
      //     userId: null,
      //     username: null
      //   }
      // })
      if (this.$store.getters.currentUser) {
        this.userData = this.$store.getters.currentUser
        loggedIn = userData.loggedIn
      }
      const ability = definePostAbility(userData, post)
      console.dir(ability.can)
      post.canEdit = ability.can('update', 'Post')
      console.log(canEdit)
    },
    onUpdateEditedText(post, newValue) {
      console.log('RUNNING')
      post.postText = newValue
    },
    onUpdateDelete() {
      this.$forceUpdate()
    },
    async getThreadData() {
      const getPostedByUserId = async (id) => {
        const getPostedByUsername = await axios.get('http://localhost:3001/users/u/' + id)
        return getPostedByUsername.data.username
      }
      this.forumId = await axios.get(
        'http://localhost:3001/forum/0/' + this.$route.params.forumName
      )
      const threadData = await axios.get(
        `http://localhost:3001/forum/${this.forumId.data.forumId}/${this.$route.params.threadId}`,
        {
          withCredentials: false
        }
      )
      this.threadPosts = threadData.data
      this.threadPosts.posts.forEach(async (a) => {
        a.type = 'Post'
        a.username = await getPostedByUserId(a.postedByUser)
        a.user = a.postedByUser
        a.href = `/u/${a.username}`
        a.postedByDate = a.createdAt
      })
    }
  },
  created() {
    this.getThreadData()
  }
}
</script>

<template>
  <div>
    <NavBar />
    <h2>Posts in Thread</h2>
    <div v-for="post in threadPosts.posts.slice(0, 10)" v-bind:key="post._id">
      <section id="main-section">
        <ThreadPost
          :forumId="this.forumId.data.forumId"
          :_postText="post.text"
          @update-postText="onUpdateEditedText"
          @update-deleteText="onUpdateDelete"
          :postedByUser="post.username"
          :postedByDate="post.postedByDate"
          :postedByUserHref="post.href"
          :id="post._id"
          :edited="post.edited"
          @update-editPost="handleUpdate"
        />
      </section>
    </div>
    <PostCreationForm></PostCreationForm>
  </div>
</template>

<style>
div > h2:hover {
  cursor: default;
}
</style>
