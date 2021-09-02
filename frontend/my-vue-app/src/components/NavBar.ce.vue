<template>
  <div class="">
    <ul class="d-inline-flex justify-content-around w-50 list-unstyled">
      <li><router-link to="/gifs">Publications</router-link></li>
      <li><router-link to="/profile">Profil</router-link></li>
      <li v-if="isAdmin === 'true'"><router-link to="/admin">Administration</router-link></li>
      <li><router-link to="/signoff">Déconnexion</router-link></li>
    </ul>       
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isAdmin: localStorage.getItem('isAdmin')
      }
    }
  }
</script>

<style>
</style>