<script>
import NavBar from './UI/NavBar.vue'
import ForumPreview from './ForumItems/ForumPreview.vue'
export default {
  name: 'Home',
  props: {},
  components: {
    NavBar,
    ForumPreview
  }
}
</script>

<template>
  <div>
    <NavBar />
    <ForumPreview />
  </div>
</template>

<style></style>
