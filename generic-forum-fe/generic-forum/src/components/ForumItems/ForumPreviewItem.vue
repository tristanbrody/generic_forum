<script>
import axios from 'axios'
export default {
  props: {
    forumName: String,
    forumDescription: String
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<template>
  <div id="forumPreview">
    <a :href="'http://localhost:5173/f/' + forumName">Forum name: {{ forumName }}</a>
    <div></div>
  </div>
</template>

<style>
#forumPreview {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid black;
  margin: 5px;
}
#forumPreview:hover {
  background: lightblue;
}
</style>
