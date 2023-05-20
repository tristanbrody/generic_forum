<script>
export default {}
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/register">Sign Up</RouterLink>
    </nav>
  </div>
</template>

<style>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
