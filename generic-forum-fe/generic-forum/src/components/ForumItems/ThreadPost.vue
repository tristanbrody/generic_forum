<script>
import axios from 'axios'
export default {
  props: {
    _postText: String,
    postedByUser: String,
    postedByDate: String,
    postedByUserHref: String,
    _canEdit: Boolean,
    edited: Boolean,
    id: String,
    forumId: String
  },
  components: {},
  data() {
    return {
      postText: this.$props._postText,
      inEditMode: false,
      canEdit: this.$props._canEdit
    }
  },
  methods: {
    async getUserData() {},
    async handleDelete() {
      const urlToPostTo = `http://localhost:3001/forum/${this.$props.forumId}/${this.$route.params.threadId}/${this.$props.id}`
      console.log(urlToPostTo)
      const postDelete = await fetch(urlToPostTo, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      console.dir(postDelete.json())
      this.$emit('update-deleteText')
      this.$router.go()
    },
    async handleEdit(e, type = 'edit') {
      this.$emit('update-editPost', this, this.canEdit)
      console.log(this.canEdit)

      if (this.canEdit) {
        this.inEditMode = !this.inEditMode
        console.log('running')
        if (type === 'save') this.updatePostText(this.$refs.editedTextarea.value)
      }
    },
    async updatePostText(text) {
      console.log(text)
      const urlToPostTo = `http://localhost:3001/forum/${this.$props.forumId}/${this.$route.params.threadId}/${this.$props.id}`
      console.log(urlToPostTo)
      const postUpdate = await fetch(urlToPostTo, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ text }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
      this.$props.edited = true
      console.dir(postUpdate.json())
      this.$emit('update-postText', this, text)
    }
  },
  created() {}
}
</script>

<template>
  <div id="post" v-if="!inEditMode">
    <div>
      <div v-if="this.$props.edited">Edited by {{ postedByUser }}</div>

      <strong>Posted by </strong>
      <a :href="'http://localhost:5173' + postedByUserHref">{{ postedByUser }}</a>
    </div>
    <strong>{{ postedByDate }}</strong>
    {{ postText }}
    <a href="#" id="edit-button" @click="handleEdit">Edit</a>
    <a href="#" id="delete-button" @click="handleDelete">Delete</a>
  </div>
  <div v-else id="id">
    <div>
      <textarea ref="editedTextarea"></textarea>
      <a href="#" id="save-button" @click="handleEdit(e, 'save')">Save</a>
    </div>
  </div>
</template>

<style>
#edit-button {
  font-size: 84%;
  width: 10px;
  position: absolute;
  align-content: center;
  bottom: 0;
  left: 0;
}

#delete-button {
  font-size: 84%;
  /* width: 10px; */
  position: absolute;
  align-content: center;
  bottom: 0;
  right: 0;
}

#post {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid black;
  margin: 5px;
}
#post:hover {
  background: lightblue;
}

textarea {
  width: 80%;
  height: 50px;
  position: relative;
}
</style>
