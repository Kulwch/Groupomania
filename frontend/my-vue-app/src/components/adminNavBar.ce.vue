<template>
  <div class="border border-dark rounded mb-3 ">
    <div class="d-flex align-items-center justify-content-around">
        <router-link to="/gifs" class="text-decoration-none text-danger">Gifs <i class="fas fa-film"></i></router-link>
        <router-link to="/allComments" class="text-decoration-none text-danger">Commentaires <i class="fas fa-quote-right"></i></router-link>
        <router-link to="/admin" class="text-decoration-none text-danger">Utilisateurs <i class="fas fa-users"></i></router-link>
        <router-link to="/logout" class="text-decoration-none text-danger">Déconnexion <i class="fas fa-sign-out-alt"></i></router-link>
    </div>       
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