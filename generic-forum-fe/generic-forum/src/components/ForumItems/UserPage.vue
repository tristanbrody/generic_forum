<script>
export default {
  props: {
    // postText: String,
    // postedByUser: String,
    // postedByDate: String,
    // postedByUserHref: String
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  async getUserData() {
    let _userData = JSON.parse(localStorage.getItem('userData'))
    const userData = await fetch('http://localhost:3001/user/u/' + _userData.userId, {})
  },
  created() {}
}
</script>

<template>
  <div id="userProfile">
    <div></div>
  </div>
</template>

<style>
/* #post {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid black;
  margin: 5px;
}
#post:hover {
  background: lightblue;
} */
</style>
