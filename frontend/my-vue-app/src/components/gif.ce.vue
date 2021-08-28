<template>
    <figure v-for="gif in gifs" :key="gif.id">
        <figcaption>{{ gif.statusText }}</figcaption>
        <img :src="gif.url" :alt="gif.title + 'publié par' +gif.completeName" />
    </figure>
</template>


<script setup>
const gifs = defineProps(['gifs']);

const axios = require('axios').default;

axios
  .get('https://catfact.ninja/docs')
  .then(res => {gifs = res})

</script>

<style>

</style>