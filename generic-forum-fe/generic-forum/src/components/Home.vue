<script>
import NavBar from './UI/NavBar.vue'
import ForumPreview from './ForumItems/ForumPreview.vue'
export default {
  name: 'Home',
  props: {
    title: 'String'
  },
  components: {
    NavBar,
    ForumPreview
  },
  data() {
    return {
      userData: {
        loggedIn: false
      }
    }
  },
  methods: {},
  created() {
    console.log(this.$store.getters.currentUser)
    this.userData = this.$store.getters.currentUser
  },
  mounted() {}
}
</script>

<template>
  <div>
    <NavBar v-if="userData.loggedIn" showLoginOptions />
    <NavBar v-if="userData.loggedIn === false" :showLoginOptions="false" />
    <div>
      {{ title }}
    </div>
    <ForumPreview />
  </div>
</template>

<style></style>
