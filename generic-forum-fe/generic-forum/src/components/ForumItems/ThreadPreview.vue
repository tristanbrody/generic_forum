<script>
import axios from 'axios'
import ThreadCreationForm from './ThreadCreationForm.vue';
export default {
  props: {
    forumName: String,
    threadId: String,
    threadSubject: String,
    createdAt: String,
    createdByUsername: String
  },
  components: {
    ThreadCreationForm
  },
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<template>
  <div id="post">
    <div>
      <a :href="'http://localhost:5173/f/' + forumName + '/' + threadId"
        ><h3>Thread subject: {{ threadSubject }}</h3></a
      >
      <h3>Created at: {{ createdAt }}</h3>
    </div>
  </div>
</template>

<style>
/* #thread {
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
