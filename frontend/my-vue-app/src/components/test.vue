<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Lien 1
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Lien 2</a>
  </p>


  <p>
    Edit
    <code>components/test.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
