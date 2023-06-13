<script>
import Register from '../components/Register.vue'
export default {
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  components: {
    Register
  }
}
</script>
<template>
  <div>
    <Register />
  </div>
</template>
