import { createMongoAbility, AbilityBuilder } from '@casl/ability'

// TODO add Vuex
//TODO create forms with overlay
// TODO add form validation
// TODO add form for forum creation
// TODO add form for creating a thread
// TODO add form for creating a post
// TODO investigate API server mocking
// TODO define abilities for users updating their accounts, users creating and updating posts, users creating and updating threads, users creating and updating forums
// TODO post to Stackoverflow with CASL approach and ask for reccs of how to improve
// TODO create classes representing each object. Then, when you define an ability within a Component, you'll pass the current user and the current object
// TODO use dynamic components to create a 'tab' feature for logged-in users
// TODO create an error alert component that uses slots
/*

<template>
  <dialog open>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  margin: 0;
  position: fixed;
  top: 20vh
  left: 30%;
  width: 40%;
  background-color: white
  box-shadow: 0 2px 8px rgba
}
</style>

*/

const definePostAbility = (user, post) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)
  can('read', 'Post')
  console.log(user)
  console.log(post)
  if (user.username === post.postedByUser) {
    can('update', 'Post')
    can('delete', 'Post')
  }

  // can also pass like can('update', 'Post', ['content'], {createdById: user.id})
  return build()
}
const defineThreadAbility = (user, post) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)
  can('read', 'Post')
  if (user.id === post.createdById) {
    can('update', 'Post')
    can('delete', 'Post')
  }

  // can also pass like can('update', 'Post', ['content'], {createdById: user.id})
  return build()
}

const defineUserAbility = (user, post) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility)
  can('read', 'Post')
  can('create', 'Post')
  if (user.id === post.createdById) {
    can('update', 'Post')
    can('delete', 'Post')
  }

  // can also pass like can('update', 'Post', ['content'], {createdById: user.id})
  return build()
}

class Post {
  constructor(createdById, threadId) {
    this.createdById = createdById
    this.threadId = threadId
  }
}

class Thread {
  constructor(createdById) {
    this.createdById = createdById
  }
}

class User {
  constructor(userId) {
    this.userId = userId
  }
}

export { definePostAbility, defineThreadAbility, defineUserAbility, Post, Thread, User }
